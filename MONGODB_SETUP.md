# 🗄️ MongoDB Atlas Setup - Step by Step

## Step 1: Create Account (1 minute)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Fill in:
   - Email: your_email@gmail.com
   - Password: Create strong password
3. Click "Create your Atlas account"
4. Verify your email

## Step 2: Create FREE Cluster (2 minutes)

1. After login, you'll see "Create a deployment"
2. Click "Create" under **M0 FREE** option
3. Configure:
   - **Cloud Provider**: AWS (recommended)
   - **Region**: Choose closest to you (e.g., N. Virginia, Mumbai, Singapore)
   - **Cluster Name**: `CineMatch`
4. Click "Create Deployment" (bottom right)
5. Wait 1-3 minutes for cluster creation

## Step 3: Create Database User (30 seconds)

A popup will appear "Security Quickstart":

1. **Username**: `cinematch`
2. **Password**: Click "Autogenerate Secure Password"
3. **IMPORTANT**: Copy and save this password somewhere safe!
4. Click "Create Database User"

## Step 4: Setup Network Access (30 seconds)

Still in the same popup:

1. Under "Where would you like to connect from?"
2. Click "My Local Environment"
3. Click "Add My Current IP Address"
4. **IMPORTANT**: Also add `0.0.0.0/0` for Vercel access:
   - Click "Add a Different IP Address"
   - IP Address: `0.0.0.0/0`
   - Description: `Allow all (Vercel)`
   - Click "Add Entry"
5. Click "Finish and Close"

## Step 5: Get Connection String (1 minute)

1. Click "Database" in left sidebar
2. Click "Connect" button on your cluster
3. Choose "Drivers"
4. Select:
   - Driver: Node.js
   - Version: 5.5 or later
5. Copy the connection string (looks like):
   ```
   mongodb+srv://cinematch:<password>@cinematch.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password from Step 3
7. Add database name at the end:
   ```
   mongodb+srv://cinematch:YOUR_PASSWORD@cinematch.xxxxx.mongodb.net/cinematch?retryWrites=true&w=majority
   ```

## Your Connection String is Ready! ✅

Example:
```
mongodb+srv://cinematch:MySecurePass123@cinematch.abc123.mongodb.net/cinematch?retryWrites=true&w=majority
```

**Save this connection string - you'll need it for Vercel deployment!**

## Troubleshooting

### Can't connect?
- Make sure you replaced `<password>` with actual password
- Check if `0.0.0.0/0` is in Network Access
- Password should NOT contain special characters like `@`, `#`, `%`

### Forgot password?
1. Go to "Database Access"
2. Click "Edit" on your user
3. Click "Edit Password"
4. Generate new password
5. Update your connection string

## Next Step

Use this connection string in Vercel deployment as `MONGODB_URI` environment variable.

---

**Need Help?**
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/getting-started/
- Video Tutorial: https://www.youtube.com/watch?v=rPqRyYJmx2g
