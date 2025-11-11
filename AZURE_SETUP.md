# Azure App Service Deployment Guide

## Quick Start: Deploy Voting System Backend to Azure

### Prerequisites
- GitHub account (you have this ✅)
- Microsoft account (for Azure)
- MongoDB Atlas account (free)

---

## Step 1: Create Free Azure Account

1. Open browser: https://azure.microsoft.com/en-us/free/
2. Click **"Start free"**
3. Sign in with **Microsoft account** (or create one)
4. Provide:
   - Name
   - Email
   - Phone number
   - Payment method (won't be charged with free tier)
5. Complete verification
6. Get **$200 free credits** for 30 days

⏱️ **Time: 5-10 minutes**

---

## Step 2: Create MongoDB Atlas Database (Free)

### Why?
Your backend needs a database to store election data.

### Setup:

1. Open: https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. Create account with email/password
4. Click **"Create a Deployment"**
5. Select **"M0 Free"** (free tier)
6. Choose region closest to you
7. Click **"Create"**
8. Wait for cluster to be ready (2-3 minutes)

### Get Connection String:

1. Click **"Connect"** button
2. Choose **"Connect your application"**
3. Select **Node.js** as driver
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/voting_system?retryWrites=true&w=majority
   ```
5. **Save this URL** — you'll need it in Step 5

⏱️ **Time: 10-15 minutes**

---

## Step 3: Set Up Azure App Service

1. Go to: https://portal.azure.com
2. Sign in with your Microsoft account
3. Click **"+ Create a resource"** (top-left corner)
4. Search for: **"App Service"**
5. Click on "App Service" result
6. Click **"Create"**

### Fill the Form:

| Field | Value |
|-------|-------|
| Subscription | Free Trial |
| Resource Group | Click "Create new" → Enter: `voting-system-rg` |
| Name | `voting-system-api-<your-name>` *(must be unique)* |
| Publish | **Code** |
| Runtime stack | **Node 18 LTS** |
| Operating System | **Linux** (cheaper) |
| Region | Choose nearest to you |
| App Service Plan | Click "Create new" → Select **F1 (Free)** |

7. Click **"Review + Create"**
8. Click **"Create"**
9. Wait for deployment (2-3 minutes)

⏱️ **Time: 5-10 minutes**

---

## Step 4: Connect GitHub to Azure

Once App Service is created:

1. Search for your app: **"voting-system-api"** in Azure portal
2. Open it (click on the name)
3. On **left sidebar**, click **"Deployment Center"**
4. Under "Source", select **"GitHub"**
5. Click **"Authorize"**
6. Sign in to GitHub when prompted
7. Fill in:
   - **Organization**: Your GitHub username
   - **Repository**: `votingsystem`
   - **Branch**: `main`
8. Click **"Save"**

✅ **Azure will now auto-deploy every time you push to GitHub!**

⏱️ **Time: 3-5 minutes**

---

## Step 5: Add Environment Variables

1. In your App Service, go to **"Configuration"** (left sidebar)
2. Click **"+ New application setting"** button
3. Add these 2 settings:

### Setting 1: MongoDB Connection String

| Field | Value |
|-------|-------|
| **Name** | `MONGODB_URI` |
| **Value** | `mongodb+srv://username:password@cluster0.abc123.mongodb.net/voting_system?retryWrites=true&w=majority` *(from Step 2)* |

- Click **"OK"**

### Setting 2: Environment Type

| Field | Value |
|-------|-------|
| **Name** | `NODE_ENV` |
| **Value** | `production` |

- Click **"OK"**

4. Click **"Save"** at the top of the page

⏱️ **Time: 3-5 minutes**

---

## Step 6: Verify Deployment

1. In App Service, go to **"Overview"**
2. Copy the **"Default domain"** URL (e.g., `https://voting-system-api-xyz.azurewebsites.net`)
3. Open in browser:
   ```
   https://voting-system-api-xyz.azurewebsites.net/api/health
   ```
4. You should see JSON response:
   ```json
   {
     "status": "ok",
     "message": "Server is running",
     "env": "production"
   }
   ```

✅ **Backend is live!**

⏱️ **Time: 1-2 minutes**

---

## Step 7: Get Your Live Backend URL

Your backend is now accessible at:

```
https://voting-system-api-xyz.azurewebsites.net/api/elections
```

Use this URL in your frontend to connect to the backend.

---

## Troubleshooting

### Deployment fails
- Go to **Deployment Center** → **Logs**
- Look for error messages

### `/api/health` returns 404 or error
- Go to **App Service** → **Log stream**
- Check for startup errors
- Usually means `MONGODB_URI` is missing or incorrect

### MongoDB connection timeout
- Check `MONGODB_URI` in Configuration (Step 5)
- Ensure MongoDB Atlas IP whitelist includes Azure (usually 0.0.0.0/0)

---

## Summary

| Step | Time | Status |
|------|------|--------|
| 1. Create Azure account | 5-10 min | ⬜ Todo |
| 2. Create MongoDB Atlas | 10-15 min | ⬜ Todo |
| 3. Create App Service | 5-10 min | ⬜ Todo |
| 4. Connect GitHub | 3-5 min | ⬜ Todo |
| 5. Add environment variables | 3-5 min | ⬜ Todo |
| 6. Verify deployment | 1-2 min | ⬜ Todo |
| **Total** | **~45 min** | |

---

## Next: Connect Frontend to Backend

Once backend is live:

1. Get your Azure backend URL
2. Update `script.js` or create `config.js`:
   ```javascript
   const API_BASE_URL = 'https://voting-system-api-xyz.azurewebsites.net/api';
   ```
3. Update API calls in voter.html, admin.html to use this URL
4. Push changes to GitHub
5. Your GitHub Pages frontend will now talk to your Azure backend!

---

## Support

If you get stuck:
1. Check Azure portal logs
2. Verify all settings are filled correctly
3. Make sure MongoDB URI has correct username/password

**Happy deploying! 🚀**
