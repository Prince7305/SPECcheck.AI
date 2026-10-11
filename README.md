# SPECcheck.AI

AI-Powered Engineering Intelligence Platform (B.Tech final-year project).

## Run locally
Prerequisites: Node 18+, MongoDB running locally (or an Atlas URI).

1. Create a GitHub OAuth App (GitHub > Settings > Developer settings > OAuth Apps):
   - Homepage URL: `http://localhost:5173`
   - Callback URL: `http://localhost:5173/api/auth/github/callback`
2. Server:
   ```
   cd server
   cp .env.example .env     # fill GitHub keys, JWT_SECRET, ENCRYPTION_KEY
   npm install
   npm run dev
   ```
3. Client (new terminal):
   ```
   cd client
   npm install
   npm run dev
   ```
4. Open http://localhost:5173, click "Login with GitHub".

Quick check: http://localhost:5000/api/health should return `{"status":"ok","db":"connected"}`.
