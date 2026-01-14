import { Handler } from '@netlify/functions';
import { db } from './firebaseAdmin';
import { GameSession, Group, Word, CheckGroupRequest, CheckGroupResponse } from '../../shared/types';

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body: CheckGroupRequest = JSON.parse(event.body || '{}');
    const { sessionId, wordIds } = body;

    // Validate input
    if (!sessionId || !wordIds || wordIds.length !== 4) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid request: need sessionId and exactly 4 wordIds' }),
      };
    }

    // Get session
    const sessionDoc = await db.collection('sessions').doc(sessionId).get();
    if (!sessionDoc.exists) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Session not found' }),
      };
    }

    const session = { id: sessionDoc.id, ...sessionDoc.data() } as GameSession;

    // Check if game is already over
    if (session.gameStatus !== 'playing') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Game already ended', gameStatus: session.gameStatus }),
      };
    }

    // Get the words and their groups
    const wordsSnapshot = await db.collection('words')
      .where('__name__', 'in', wordIds)
      .get();

    if (wordsSnapshot.size !== 4) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid word IDs' }),
      };
    }

    const words: Word[] = wordsSnapshot.docs.map(doc => ({
      id: doc.id,
      text: doc.data().text,
      groupId: doc.data().groupId,
    }));

    // Check if all words belong to the same group
    const groupIds = [...new Set(words.map(w => w.groupId))];

    if (groupIds.length === 1) {
      // Correct guess!
      const groupId = groupIds[0];
      
      // Check if this group was already solved
      if (session.solvedGroupIds.includes(groupId)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Group already solved' }),
        };
      }

      // Get group details
      const groupDoc = await db.collection('groups').doc(groupId).get();
      const group = { id: groupDoc.id, ...groupDoc.data() } as Group;

      // Update session
      const newSolvedGroupIds = [...session.solvedGroupIds, groupId];
      const isWin = newSolvedGroupIds.length === 4;

      await db.collection('sessions').doc(sessionId).update({
        solvedGroupIds: newSolvedGroupIds,
        gameStatus: isWin ? 'won' : 'playing',
        updatedAt: new Date().toISOString(),
      });

      const response: CheckGroupResponse = {
        correct: true,
        groupName: group.name,
        groupId: group.id,
        difficulty: group.difficulty,
        words: words.map(w => ({ id: w.id, text: w.text })),
        attemptsRemaining: session.maxAttempts - session.attempts,
        gameStatus: isWin ? 'won' : 'playing',
      };

      return { statusCode: 200, headers, body: JSON.stringify(response) };

    } else {
      // Wrong guess
      const newAttempts = session.attempts + 1;
      const isLost = newAttempts >= session.maxAttempts;

      await db.collection('sessions').doc(sessionId).update({
        attempts: newAttempts,
        gameStatus: isLost ? 'lost' : 'playing',
        updatedAt: new Date().toISOString(),
      });

      let allGroups: Group[] | undefined;

      // If game is lost, return all groups
      if (isLost) {
        const groupsSnapshot = await db.collection('groups')
          .where('puzzleId', '==', session.puzzleId)
          .get();

        allGroups = [];
        for (const doc of groupsSnapshot.docs) {
          const groupData = doc.data();
          const wordsSnapshot = await db.collection('words')
            .where('groupId', '==', doc.id)
            .get();
          
          allGroups.push({
            id: doc.id,
            puzzleId: session.puzzleId,
            name: groupData.name,
            difficulty: groupData.difficulty,
            words: wordsSnapshot.docs.map(w => ({
              id: w.id,
              text: w.data().text,
              groupId: doc.id,
            })),
          });
        }
      }

      const response: CheckGroupResponse = {
        correct: false,
        attemptsRemaining: session.maxAttempts - newAttempts,
        gameStatus: isLost ? 'lost' : 'playing',
        allGroups,
      };

      return { statusCode: 200, headers, body: JSON.stringify(response) };
    }

  } catch (error) {
    console.error('Error checking group:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
