# 🚀 Deploy Scribex to the Web

Your code is now on GitHub! ✅ 
**Repository**: https://github.com/debasish5452v/Scribex

## 📋 Quick Deployment Steps

### 🎯 **Recommended: Vercel (Frontend) + Render (Backend)**
Both offer **FREE** plans to get started!

---

## 🔵 **Step 1: Deploy Frontend to Vercel** (5 minutes)

### 1️⃣ Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Login with GitHub"
   - Authorize Vercel to access your GitHub

### 2️⃣ Import Your Project
   - Click "Add New..." → "Project"
   - Select your **Scribex** repository
   - Vercel will auto-detect it's a Vite project

### 3️⃣ Configure Frontend Build Settings
```
Framework Preset: Vite
Root Directory: client
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 4️⃣ Add Environment Variables
Click "Environment Variables" and add:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_a25vd24tZG9nLTE3LmNsZXJrLmFjY291bnRzLmRldiQ
```

### 5️⃣ Deploy!
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll get a URL like: `https://scribex-xxxx.vercel.app` ✅

---

## 🟢 **Step 2: Deploy Backend to Render** (7 minutes)

### 1️⃣ Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Authorize Render

### 2️⃣ Create New Web Service
   - Click "New +" → "Web Service"
   - Connect your **Scribex** repository
   - Select "Node" environment

### 3️⃣ Configure Backend Settings
```
Name: scribex-backend
Region: Choose closest to you (e.g., Singapore for India)
Branch: main
Root Directory: server
Build Command: npm install
Start Command: npm run server
```

### 4️⃣ Select Free Plan
   - Instance Type: **Free** (0.1 CPU, 512 MB RAM)
   - Note: Free tier spins down after 15 min of inactivity

### 5️⃣ Add Environment Variables
Click "Environment" tab and add ALL these:

```
PORT=3000
DATABASE_URL=postgresql://neondb_owner:npg_P9ELuSkbvq6f@ep-cold-sea-ad34x0w9-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
CLERK_PUBLISHABLE_KEY=pk_test_a25vd24tZG9nLTE3LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_4MLab7Pq78PAC2ErF2jmvSDuHTLNEOeTOVZPsUkIj8
GEMINI_API_KEY=AIzaSyC_B0Bws0q0NYLV9nuCEaLbGQ46NWfZZPM
CLIPDROP_API_KEY=54c3d0ef80ec874ec0cc338f02f598da1d6eac99d2a9745f9aa6f54b8d8345f8a4dcc6a482a76323e60043179beadb1d
CLOUDINARY_CLOUD_NAME=dmi9tjz8o
CLOUDINARY_API_KEY=151867588627522
CLOUDINARY_API_SECRET=L1y2tLeSU_Ohlsabv_Mt8-k7MEY
NODE_ENV=production
```

### 6️⃣ Deploy Backend
   - Click "Create Web Service"
   - Wait 5-7 minutes for build
   - You'll get a URL like: `https://scribex-backend.onrender.com` ✅

---

## 🔗 **Step 3: Connect Frontend to Backend**

### 1️⃣ Update Frontend Environment Variable
   - Go back to **Vercel Dashboard**
   - Go to your Scribex project → Settings → Environment Variables
   - Add new variable:
   ```
   VITE_API_URL=https://scribex-backend.onrender.com
   ```

### 2️⃣ Update Backend CORS
   - Go to **Render Dashboard**
   - Go to your backend service → Environment
   - Add new variable:
   ```
   CLIENT_URL=https://scribex-xxxx.vercel.app
   ```
   (Replace with your actual Vercel URL)

### 3️⃣ Redeploy Both
   - Vercel: Will auto-redeploy when you save env vars
   - Render: Click "Manual Deploy" → "Deploy latest commit"

---

## 🎉 **Step 4: Test Your Live Website!**

Visit your Vercel URL: `https://scribex-xxxx.vercel.app`

### ✅ Test These Features:
- [ ] Sign Up / Login (Clerk authentication)
- [ ] Generate Article (Free feature)
- [ ] Generate Blog Titles (Free feature)
- [ ] Remove Background (Free feature - Cloudinary)
- [ ] Remove Object (Free feature - Cloudinary)
- [ ] Resume Review (Free feature - Gemini AI)
- [ ] Premium Plan shows ₹899/month pricing

---

## 📊 **Deployment Summary**

| Service | Plan | Cost | Purpose |
|---------|------|------|---------|
| **Vercel** | Hobby (Free) | ₹0 | Frontend hosting |
| **Render** | Free | ₹0 | Backend API |
| **Neon** | Free | ₹0 | PostgreSQL database |
| **Clerk** | Free | ₹0 | Authentication (10k users) |
| **Cloudinary** | Free | ₹0 | Image processing |
| **Total** | | **₹0/month** | 🎉 |

**Note**: All services have free tiers perfect for getting started!

---

## ⚠️ **Important Notes**

### **Render Free Tier Limitations:**
- Backend spins down after 15 min of inactivity
- First request after sleep takes ~30 seconds to wake up
- 750 hours/month free (enough for testing)

### **To Upgrade (When You Have Users):**
- **Render**: $7/month for always-on backend
- **Vercel**: Hobby plan stays free forever
- **Total Cost**: ~₹600/month for production-ready hosting

---

## 🆘 **Troubleshooting**

### **Frontend not loading?**
- Check browser console for errors
- Verify VITE_API_URL in Vercel env vars
- Make sure CLIENT_URL in Render matches your Vercel URL

### **Backend errors?**
- Check Render logs (Dashboard → Logs tab)
- Verify all environment variables are set
- Test backend directly: `https://your-backend.onrender.com/api/health`

### **Authentication not working?**
- Update Clerk dashboard with new URLs:
  - Go to clerk.com → Your App → Settings
  - Add your Vercel URL to "Allowed Origins"

---

## 🚀 **Next Steps After Deployment**

1. **Custom Domain** (Optional)
   - Vercel: Settings → Domains → Add Domain
   - Example: `www.scribex.app`

2. **Setup Analytics**
   - Add Google Analytics
   - Or use Vercel Analytics (built-in)

3. **Setup Payment Gateway**
   - Integrate Stripe for Premium (₹899/month)
   - Or use Razorpay for Indian customers

4. **Monitor Your App**
   - Vercel: Automatic monitoring included
   - Render: Check logs regularly

---

## 📞 **Need Help?**

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Clerk Docs**: https://clerk.com/docs

---

**Your app is ready to go live! 🎉**
Follow these steps and your Scribex will be accessible worldwide in ~15 minutes!
