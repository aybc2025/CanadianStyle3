import { Handler } from '@netlify/functions';
import { db } from './firebaseAdmin';
import { Puzzle, Group, Word, GameSession, GetTodayPuzzleResponse } from '../../shared/types';
import { v4 as uuidv4 } from 'uuid';

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const visitorId = event.queryStringParameters?.visitorId || uuidv4();

    // Get active puzzle for today (or most recent active)
    const puzzlesSnapshot = await db.collection('puzzles')
      .where('status', '==', 'active')
      .where('publishDate', '<=', today)
      .orderBy('publishDate', 'desc')
      .limit(1)
      .get();

    if (puzzlesSnapshot.empty) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'No active puzzle found' }),
      };
    }

    const puzzleDoc = puzzlesSnapshot.docs[0];
    const puzzle = { id: puzzleDoc.id, ...puzzleDoc.data() } as Puzzle;

    // Get groups for this puzzle
    const groupsSnapshot = await db.collection('groups')
      .where('puzzleId', '==', puzzle.id)
      .get();

    const groups: Group[] = [];
    for (const doc of groupsSnapshot.docs) {
      const groupData = doc.data();
      
      // Get words for this group
      const wordsSnapshot = await db.collection('words')
        .where('groupId', '==', doc.id)
        .get();
      
      const words: Word[] = wordsSnapshot.docs.map(w => ({
        id: w.id,
        text: w.data().text,
        groupId: doc.id,
      }));

      groups.push({
        id: doc.id,
        puzzleId: puzzle.id,
        name: groupData.name,
        difficulty: groupData.difficulty,
        words,
      });
    }

    // Check for existing session
    const sessionQuery = await db.collection('sessions')
      .where('puzzleId', '==', puzzle.id)
      .where('visitorId', '==', visitorId)
      .limit(1)
      .get();

    let session: GameSession;

    if (!sessionQuery.empty) {
      // Use existing session
      const sessionDoc = sessionQuery.docs[0];
      session = { id: sessionDoc.id, ...sessionDoc.data() } as GameSession;
    } else {
      // Create new session
      const newSession: Omit<GameSession, 'id'> = {
        puzzleId: puzzle.id,
        visitorId,
        attempts: 0,
        maxAttempts: 4,
        solvedGroupIds: [],
        hintUsed: false,
        gameStatus: 'playing',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const sessionRef = await db.collection('sessions').add(newSession);
      session = { id: sessionRef.id, ...newSession };
    }

    // Prepare response
    // Get all words, shuffled
    const allWords = groups.flatMap(g => g.words);
    const unsolvedWords = allWords.filter(w => 
      !session.solvedGroupIds.includes(w.groupId)
    );
    const shuffledWords = shuffleArray(unsolvedWords);

    // Get solved groups with their details
    const solvedGroups = groups
      .filter(g => session.solvedGroupIds.includes(g.id))
      .map(g => ({
        id: g.id,
        name: g.name,
        difficulty: g.difficulty,
        words: g.words.map(w => ({ id: w.id, text: w.text })),
      }));

    const response: GetTodayPuzzleResponse = {
      puzzleId: puzzle.id,
      words: shuffledWords.map(w => ({ id: w.id, text: w.text })),
      maxAttempts: session.maxAttempts,
      session: {
        id: session.id,
        attempts: session.attempts,
        solvedGroupIds: session.solvedGroupIds,
        hintUsed: session.hintUsed,
        gameStatus: session.gameStatus,
      },
      solvedGroups,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };

  } catch (error) {
    console.error('Error fetching puzzle:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
