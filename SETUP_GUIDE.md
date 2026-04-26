# Innovathon Setup Guide

## Prerequisites
1. MongoDB Atlas account - https://www.mongodb.com/cloud/atlas/register
2. Firebase project - https://console.firebase.google.com/
3. Razorpay account - https://razorpay.com/

## Step 1: MongoDB Atlas Setup
1. Create a free cluster
2. Create a database user (username/password)
3. Whitelist IP: 0.0.0.0/0 (for development)
4. Get connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/innovathon`
5. Update `server/.env` with the connection string

## Step 2: Firebase Setup
1. Create Firebase project
2. Enable Google Sign-In in Authentication > Sign-in method
3. Get Web App config (for client): Update `client/.env`
4. Generate private key (Service Account): Update `server/.env`

## Step 3: Razorpay Setup
1. Create Razorpay account
2. Get test keys from Dashboard
3. Update `server/.env` with RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET

## Step 4: Start Development
```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

## Testing the APIs
```bash
# Health check
curl http://localhost:5000/health

# Test auth endpoint (requires Firebase ID token)
curl -X POST http://localhost:5000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"idToken": "YOUR_FIREBASE_ID_TOKEN"}'
```
