# Voting System (votingsystem)

This repository contains a simple static frontend and an Express/MongoDB backend for a voting system.

## Quick start (local)

1. Install dependencies

```powershell
cd "C:\Users\ramak\OneDrive\Desktop\html_template"
npm install
```

2. Create a local `.env` file from the example

```powershell
copy .env.example .env
# then edit .env to set MONGODB_URI if you need a remote DB
```

3. Start MongoDB locally (e.g., with mongod or using MongoDB Desktop/Compass)

4. Start the server

```powershell
npm run dev   # runs with nodemon
# or
npm start
```

5. Open the frontend

- http://localhost:5000 (or the port set in `.env`)

## Deployment

- GitHub Pages is used for the static frontend at `https://<username>.github.io/votingsystem/`.
- For a hosted backend, deploy the `server.js` and `backend` folder to a Node-capable host (Heroku, Fly, Render, etc.) and set `MONGODB_URI` to a hosted MongoDB instance.

## Files

- `server.js` - Express server that serves static files and provides REST API under `/api/elections`.
- `backend/models/Election.js` - Mongoose model for elections.
- `backend/routes/electionRoutes.js` - CRUD routes for elections.

## Notes

- `.env` is ignored by git. Keep secrets out of the repo.
- If you want, I can add deployment configs for Heroku/Render/Procfile/Docker.

