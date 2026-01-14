# Ma HaKesher - Daily Hebrew Word Puzzle

A Hebrew word puzzle game inspired by NYT Connections. Find the connection between 16 words by grouping them into 4 categories of 4 words each.

## Architecture

```
ma-hakesher/
├── frontend/          # React PWA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/  # API calls
│   │   └── store/     # Zustand state
│   └── public/
├── netlify/
│   └── functions/     # Serverless API
│       ├── getTodayPuzzle.ts
│       ├── checkGroup.ts
│       ├── getHint.ts
│       └── adminPuzzles.ts
├── firebase/
│   ├── firestore.rules
│   └── seed/
└── shared/
    └── types.ts       # Shared TypeScript types
```

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Zustand
- **Backend**: Netlify Functions (serverless)
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Hosting**: Netlify

## Setup

### 1. Firebase Setup

1. Create a new Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Enable Authentication (Email/Password)
4. Create an admin user in Authentication
5. Add the admin user to Firestore:
   ```
   Collection: admins
   Document ID: [user's UID]
   Fields: { role: "admin" }
   ```
6. Get your Firebase config (Project Settings > General > Your apps)
7. Generate a service account key (Project Settings > Service Accounts)

### 2. Environment Variables

Create `.env` file in the root:

```bash
# Copy from .env.example and fill in your values
cp .env.example .env
```

For Netlify deployment, add these in Netlify Dashboard > Site Settings > Environment Variables.

### 3. Local Development

```bash
# Install all dependencies
npm run install:all

# Run with Netlify Dev (includes functions)
npm run netlify:dev

# Or just frontend
npm run dev
```

### 4. Deploy to Netlify

1. Push to GitHub
2. Connect repo to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

## API Endpoints

### Public

- `GET /.netlify/functions/getTodayPuzzle?visitorId=xxx`
- `POST /.netlify/functions/checkGroup` - Body: `{ sessionId, wordIds[] }`
- `POST /.netlify/functions/getHint` - Body: `{ sessionId }`

### Admin (requires Firebase Auth token)

- `GET /.netlify/functions/adminPuzzles` - List all puzzles
- `POST /.netlify/functions/adminPuzzles` - Create puzzle
- `PUT /.netlify/functions/adminPuzzles?id=xxx` - Update puzzle
- `DELETE /.netlify/functions/adminPuzzles?id=xxx` - Delete puzzle

## Firestore Collections

```
puzzles/
  {puzzleId}/
    title: string
    publishDate: string (YYYY-MM-DD)
    status: "draft" | "active" | "archived"
    createdAt: timestamp
    updatedAt: timestamp

groups/
  {groupId}/
    puzzleId: string
    name: string
    difficulty: "easy" | "medium" | "hard" | "expert"

words/
  {wordId}/
    groupId: string
    text: string

sessions/
  {sessionId}/
    puzzleId: string
    visitorId: string
    attempts: number
    maxAttempts: number
    solvedGroupIds: string[]
    hintUsed: boolean
    gameStatus: "playing" | "won" | "lost"

admins/
  {uid}/
    role: "admin"
```

## Security

- All game logic runs server-side (Netlify Functions)
- Sessions are tracked per visitor (localStorage UUID)
- Admin operations require Firebase Auth token
- Firestore rules restrict access appropriately

## License

MIT
