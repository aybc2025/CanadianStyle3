import { Handler } from '@netlify/functions';
import { db } from './firebaseAdmin';
import { GameSession, Group, Word, GetHintRequest, GetHintResponse, Difficulty } from '../../shared/types';

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
    const body: GetHintRequest = JSON.parse(event.body || '{}');
    const { sessionId } = body;

    if (!sessionId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing sessionId' }),
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

    // Check if hint already used
    if (session.hintUsed) {
      const response: GetHintResponse = {
        success: false,
        error: 'Hint already used for this puzzle',
      };
      return { statusCode: 400, headers, body: JSON.stringify(response) };
    }

    // Check if game is still playing
    if (session.gameStatus !== 'playing') {
      const response: GetHintResponse = {
        success: false,
        error: 'Game already ended',
      };
      return { statusCode: 400, headers, body: JSON.stringify(response) };
    }

    // Get unsolved groups
    const groupsSnapshot = await db.collection('groups')
      .where('puzzleId', '==', session.puzzleId)
      .get();

    const unsolvedGroups: (Group & { words: Word[] })[] = [];
    
    for (const doc of groupsSnapshot.docs) {
      if (session.solvedGroupIds.includes(doc.id)) {
        continue; // Skip solved groups
      }

      const groupData = doc.data();
      const wordsSnapshot = await db.collection('words')
        .where('groupId', '==', doc.id)
        .get();
      
      unsolvedGroups.push({
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

    if (unsolvedGroups.length === 0) {
      const response: GetHintResponse = {
        success: false,
        error: 'No unsolved groups',
      };
      return { statusCode: 400, headers, body: JSON.stringify(response) };
    }

    // Sort by difficulty (easiest first)
    const difficultyOrder: Record<Difficulty, number> = { easy: 0, medium: 1, hard: 2, expert: 3 };
    unsolvedGroups.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);

    // Get the easiest unsolved group
    const targetGroup = unsolvedGroups[0];

    // Shuffle and pick 2 words
    const shuffledWords = shuffleArray(targetGroup.words);
    const hintWords = shuffledWords.slice(0, 2);

    // Mark hint as used
    await db.collection('sessions').doc(sessionId).update({
      hintUsed: true,
      updatedAt: new Date().toISOString(),
    });

    const response: GetHintResponse = {
      success: true,
      hintType: 'pair',
      wordIds: hintWords.map(w => w.id),
    };

    return { statusCode: 200, headers, body: JSON.stringify(response) };

  } catch (error) {
    console.error('Error getting hint:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
