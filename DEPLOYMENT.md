# Deployment Guide for Voting System Backend

This guide covers deploying your Node.js/Express backend to popular platforms.

## Prerequisites

1. **MongoDB Atlas** (free tier available)
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/voting_system?retryWrites=true&w=majority`

2. **Git repository** already on GitHub ✅

## Option 1: Deploy to Heroku (Easiest)

### Setup
1. Install Heroku CLI from https://devcenter.heroku.com/articles/heroku-cli
2. Login to Heroku
   ```powershell
   heroku login
   ```
3. Create a new Heroku app
   ```powershell
   heroku create your-app-name
   ```
   (Replace `your-app-name` with something like `voting-system-backend`)

### Deploy
1. From your project directory
   ```powershell
   cd "C:\Users\ramak\OneDrive\Desktop\html_template"
   git push heroku main
   ```

### Configure Environment Variables
1. Go to https://dashboard.heroku.com/apps and select your app
2. Click "Settings" → "Config Vars"
3. Add:
   - **MONGODB_URI**: `mongodb+srv://username:password@cluster.mongodb.net/voting_system?retryWrites=true&w=majority`
   - **NODE_ENV**: `production`
   - **PORT**: (Heroku sets this automatically, but you can set it to 5000 if needed)

4. Your app will be live at: `https://your-app-name.herokuapp.com/`
5. API endpoint: `https://your-app-name.herokuapp.com/api/elections`

### Verify Deployment
```powershell
# Check logs
heroku logs --tail

# View your app
heroku open
```

---

## Option 2: Deploy to Render (Free tier available)

### Setup
1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository (Ramakrishna1317/votingsystem)
4. Configure:
   - **Name**: `voting-system-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

### Configure Environment Variables
1. In Render dashboard, go to "Environment"
2. Add:
   - **MONGODB_URI**: (MongoDB Atlas connection string)
   - **NODE_ENV**: `production`

3. Your app will be live at: `https://voting-system-backend.onrender.com`

---

## Option 3: Deploy to Railway (Simple, free tier)

### Setup
1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub"
3. Select your votingsystem repository
4. Add MongoDB plugin:
   - Click "Add Plugins" → "MongoDB"
5. Railway auto-generates `MONGODB_URI` for you

### Deploy
The app deploys automatically when you push to GitHub.

Your backend will be accessible at the Railway-provided URL.

---

## Option 4: Deploy to Fly.io

### Setup
1. Install Fly CLI: https://fly.io/docs/getting-started/installing-flyctl/
2. Login
   ```powershell
   flyctl auth login
   ```
3. Launch your app
   ```powershell
   flyctl launch
   ```
   Follow prompts (choose your region, confirm app name, etc.)

### Configure Secrets
```powershell
flyctl secrets set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/voting_system?retryWrites=true&w=majority"
flyctl secrets set NODE_ENV="production"
```

### Deploy
```powershell
flyctl deploy
```

Your app will be live at: `https://app-name.fly.dev`

---

## Get MongoDB Atlas Connection String

1. Go to https://cloud.mongodb.com
2. Click your cluster → "Connect"
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.abc123.mongodb.net/voting_system?retryWrites=true&w=majority
   ```
5. Replace `username` and `password` with your MongoDB credentials

---

## Frontend Configuration

Once your backend is live, update your frontend to point to it:

### Update `script.js` (or create a config file)
```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';

// Use in fetch calls
fetch(`${API_BASE_URL}/elections`)
```

Or for GitHub Pages hosted frontend:
- If backend is at `https://voting-system-backend.herokuapp.com`
- Update API calls in voter.html, admin.html, and script.js to use this URL

---

## Monitoring & Logs

### Heroku
```powershell
heroku logs --tail
```

### Render
Dashboard → Logs tab

### Fly.io
```powershell
flyctl logs
```

---

## Troubleshooting

### "Cannot find module" error
- Ensure `npm install` ran on the server
- Check `package.json` has all dependencies listed

### MongoDB connection fails
- Verify connection string in .env / Config Vars
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)

### Port binding error
- Remove hardcoded `5000` from server.js — use `process.env.PORT`
- ✅ Already done in your server.js

---

## Next Steps

1. **Choose a platform** from the options above
2. **Set up MongoDB Atlas** (if not already done)
3. **Deploy** using the platform's guide
4. **Test the API** with:
   ```powershell
   curl https://your-backend-url.com/api/elections
   ```
5. **Update frontend** to point to your live backend URL

Need help? Each platform has excellent docs:
- Heroku: https://devcenter.heroku.com/
- Render: https://render.com/docs
- Railway: https://docs.railway.app
- Fly.io: https://fly.io/docs
