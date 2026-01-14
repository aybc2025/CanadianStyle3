import { Handler } from '@netlify/functions';
import { db, auth } from './firebaseAdmin';
import { Puzzle, Group, CreatePuzzleRequest } from '../../shared/types';
import { v4 as uuidv4 } from 'uuid';

// Verify Firebase Auth token
async function verifyAdmin(authHeader: string | undefined): Promise<string | null> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  
  try {
    const decodedToken = await auth.verifyIdToken(token);
    
    // Check if user is admin
    const adminDoc = await db.collection('admins').doc(decodedToken.uid).get();
    if (!adminDoc.exists || adminDoc.data()?.role !== 'admin') {
      return null;
    }
    
    return decodedToken.uid;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Verify admin authentication
  const adminUid = await verifyAdmin(event.headers.authorization);
  if (!adminUid) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  const path = event.path.replace('/.netlify/functions/adminPuzzles', '');
  const puzzleId = event.queryStringParameters?.id;

  try {
    // GET - List all puzzles
    if (event.httpMethod === 'GET' && !puzzleId) {
      const puzzlesSnapshot = await db.collection('puzzles')
        .orderBy('publishDate', 'desc')
        .get();

      const puzzles: Puzzle[] = [];
      
      for (const doc of puzzlesSnapshot.docs) {
        const puzzleData = doc.data();
        
        // Get groups for this puzzle
        const groupsSnapshot = await db.collection('groups')
          .where('puzzleId', '==', doc.id)
          .get();

        const groups: Group[] = [];
        for (const groupDoc of groupsSnapshot.docs) {
          const groupData = groupDoc.data();
          const wordsSnapshot = await db.collection('words')
            .where('groupId', '==', groupDoc.id)
            .get();

          groups.push({
            id: groupDoc.id,
            puzzleId: doc.id,
            name: groupData.name,
            difficulty: groupData.difficulty,
            words: wordsSnapshot.docs.map(w => ({
              id: w.id,
              text: w.data().text,
              groupId: groupDoc.id,
            })),
          });
        }

        puzzles.push({
          id: doc.id,
          title: puzzleData.title,
          publishDate: puzzleData.publishDate,
          status: puzzleData.status,
          groups,
          createdAt: puzzleData.createdAt,
          updatedAt: puzzleData.updatedAt,
        });
      }

      return { statusCode: 200, headers, body: JSON.stringify({ puzzles }) };
    }

    // GET - Single puzzle
    if (event.httpMethod === 'GET' && puzzleId) {
      const puzzleDoc = await db.collection('puzzles').doc(puzzleId).get();
      
      if (!puzzleDoc.exists) {
        return { statusCode: 404, headers, body: JSON.stringify({ error: 'Puzzle not found' }) };
      }

      const puzzleData = puzzleDoc.data()!;
      const groupsSnapshot = await db.collection('groups')
        .where('puzzleId', '==', puzzleId)
        .get();

      const groups: Group[] = [];
      for (const groupDoc of groupsSnapshot.docs) {
        const groupData = groupDoc.data();
        const wordsSnapshot = await db.collection('words')
          .where('groupId', '==', groupDoc.id)
          .get();

        groups.push({
          id: groupDoc.id,
          puzzleId: puzzleId,
          name: groupData.name,
          difficulty: groupData.difficulty,
          words: wordsSnapshot.docs.map(w => ({
            id: w.id,
            text: w.data().text,
            groupId: groupDoc.id,
          })),
        });
      }

      const puzzle: Puzzle = {
        id: puzzleId,
        title: puzzleData.title,
        publishDate: puzzleData.publishDate,
        status: puzzleData.status,
        groups,
        createdAt: puzzleData.createdAt,
        updatedAt: puzzleData.updatedAt,
      };

      return { statusCode: 200, headers, body: JSON.stringify({ puzzle }) };
    }

    // POST - Create new puzzle
    if (event.httpMethod === 'POST') {
      const body: CreatePuzzleRequest = JSON.parse(event.body || '{}');
      const { title, publishDate, groups } = body;

      if (!title || !publishDate || !groups || groups.length !== 4) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid puzzle data: need title, publishDate, and exactly 4 groups' }),
        };
      }

      // Validate each group has exactly 4 words
      for (const group of groups) {
        if (!group.name || !group.difficulty || !group.words || group.words.length !== 4) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Each group must have name, difficulty, and exactly 4 words' }),
          };
        }
      }

      const now = new Date().toISOString();
      const puzzleId = uuidv4();

      // Create puzzle document
      await db.collection('puzzles').doc(puzzleId).set({
        title,
        publishDate,
        status: 'draft',
        createdAt: now,
        updatedAt: now,
      });

      // Create groups and words
      for (const group of groups) {
        const groupId = uuidv4();
        
        await db.collection('groups').doc(groupId).set({
          puzzleId,
          name: group.name,
          difficulty: group.difficulty,
        });

        for (const wordText of group.words) {
          const wordId = uuidv4();
          await db.collection('words').doc(wordId).set({
            groupId,
            text: wordText.trim(),
          });
        }
      }

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ success: true, puzzleId }),
      };
    }

    // PUT - Update puzzle (activate/deactivate)
    if (event.httpMethod === 'PUT' && puzzleId) {
      const body = JSON.parse(event.body || '{}');
      const { status, title, publishDate } = body;

      const updates: Record<string, unknown> = {
        updatedAt: new Date().toISOString(),
      };

      if (status) {
        // If activating, deactivate all other puzzles
        if (status === 'active') {
          const activePuzzles = await db.collection('puzzles')
            .where('status', '==', 'active')
            .get();
          
          const batch = db.batch();
          for (const doc of activePuzzles.docs) {
            if (doc.id !== puzzleId) {
              batch.update(doc.ref, { status: 'draft', updatedAt: new Date().toISOString() });
            }
          }
          await batch.commit();
        }
        updates.status = status;
      }

      if (title) updates.title = title;
      if (publishDate) updates.publishDate = publishDate;

      await db.collection('puzzles').doc(puzzleId).update(updates);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    }

    // DELETE - Delete puzzle
    if (event.httpMethod === 'DELETE' && puzzleId) {
      // Delete all words in groups of this puzzle
      const groupsSnapshot = await db.collection('groups')
        .where('puzzleId', '==', puzzleId)
        .get();

      const batch = db.batch();

      for (const groupDoc of groupsSnapshot.docs) {
        const wordsSnapshot = await db.collection('words')
          .where('groupId', '==', groupDoc.id)
          .get();
        
        for (const wordDoc of wordsSnapshot.docs) {
          batch.delete(wordDoc.ref);
        }
        batch.delete(groupDoc.ref);
      }

      batch.delete(db.collection('puzzles').doc(puzzleId));
      await batch.commit();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' }),
    };

  } catch (error) {
    console.error('Admin puzzle error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
