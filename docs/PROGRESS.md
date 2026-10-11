# SPECcheck.AI - Progress Log (for mentor reviews)

## Increment 1 - Foundation: project skeleton + GitHub login + repo list
**Goal:** a user can log in with GitHub and see their repositories. This is the base for every later module.

**What was built**
- Monorepo: `client/` (React + Tailwind via Vite) and `server/` (Node + Express + MongoDB)
- Health endpoint to verify server and database
- GitHub OAuth login (with `state` check against CSRF)
- Session via JWT in an httpOnly cookie
- GitHub access token stored AES-256-GCM encrypted
- `/api/repos` fetches the user's repositories through the GitHub REST API

**Why these choices (viva points)**
- OAuth instead of passwords: no password handling, and we get API access to repos.
- Minimum scopes (`read:user public_repo`): least privilege.
- httpOnly cookie: JavaScript cannot read it, so XSS cannot steal the session.
- Encrypted token at rest: a database leak does not leak GitHub access.
- Vite proxy: frontend and API share one origin in development.

**Demo script**
1. Open `/api/health` -> `status: ok, db: connected`
2. Click Login with GitHub -> redirected back, avatar and name shown
3. Repo list appears -> proof that GitHub integration (module 6.1) works
4. Show the `users` collection: token is unreadable ciphertext

**Maps to synopsis:** Module 6.1 GitHub Repository Integration (partial); Technology Stack: GitHub OAuth, JWT, Node/Express, MongoDB, React, Tailwind.

**Next increment:** ingest a selected repo (file tree, commits, PRs) into MongoDB.
