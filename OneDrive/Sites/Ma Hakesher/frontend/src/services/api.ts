// API service for communicating with Netlify functions
import { 
  GetTodayPuzzleResponse, 
  CheckGroupRequest, 
  CheckGroupResponse,
  GetHintRequest,
  GetHintResponse 
} from '../../shared/types';

const API_BASE = '/.netlify/functions';

// Get or create visitor ID
function getVisitorId(): string {
  let visitorId = localStorage.getItem('ma-hakesher-visitor-id');
  if (!visitorId) {
    visitorId = crypto.randomUUID ? crypto.randomUUID() : 
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    localStorage.setItem('ma-hakesher-visitor-id', visitorId);
  }
  return visitorId;
}

export async function fetchTodayPuzzle(): Promise<GetTodayPuzzleResponse> {
  const visitorId = getVisitorId();
  const response = await fetch(`${API_BASE}/getTodayPuzzle?visitorId=${visitorId}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch puzzle');
  }
  
  return response.json();
}

export async function checkGroup(sessionId: string, wordIds: string[]): Promise<CheckGroupResponse> {
  const request: CheckGroupRequest = { sessionId, wordIds };
  
  const response = await fetch(`${API_BASE}/checkGroup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to check group');
  }
  
  return response.json();
}

export async function getHint(sessionId: string): Promise<GetHintResponse> {
  const request: GetHintRequest = { sessionId };
  
  const response = await fetch(`${API_BASE}/getHint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get hint');
  }
  
  return response.json();
}
