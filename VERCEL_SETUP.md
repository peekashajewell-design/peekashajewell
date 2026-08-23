# Deploying Peekasha Jewell to Vercel

This guide will help you deploy your jewelry e-commerce website to Vercel with proper database storage using Vercel KV (Redis).

## Prerequisites
- GitHub account
- Vercel account (free tier works)
- Git installed on your computer

## Step 1: Push Code to GitHub

1. **Initialize Git Repository** (if not already done):
   ```bash
   cd /Users/sumit.jaiswal/Desktop/PersonalWork/peekashajewell
   git init
   git add .
   git commit -m "Initial commit: Peekasha Jewell website"
   ```

2. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name: `peekashajewell` (or your preferred name)
   - Keep it Private (recommended for business sites)
   - Don't initialize with README (we already have code)
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/peekashajewell.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Create Vercel KV Database

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Navigate to Storage**: Click "Storage" in the sidebar
3. **Create KV Database**:
   - Click "Create Database"
   - Select "KV" (Redis-based key-value store)
   - Name it: `peekasha-db` (or your preferred name)
   - Choose region closest to your target audience (Asia for India)
   - Click "Create"

4. **Copy Environment Variables**:
   - After creation, you'll see two variables:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
   - Keep this tab open, you'll need these values

## Step 3: Deploy to Vercel

1. **Import Your Repository**:
   - Go to https://vercel.com/new
   - Click "Import" next to your GitHub repository
   - If you don't see it, click "Adjust GitHub App Permissions" to grant access

2. **Configure Project**:
   - **Project Name**: `peekashajewell` (or your preferred subdomain)
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

3. **Add Environment Variables**:
   Click "Environment Variables" and add these:

   ```
   ADMIN_PASSWORD=shreyariji1234123
   WHATSAPP_NUMBER=918115331054
   NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app
   ```

   **Important**: DO NOT add `KV_REST_API_URL` and `KV_REST_API_TOKEN` manually.
   These will be added automatically when you connect the KV database.

4. **Connect KV Database**:
   - After deployment, go to your project settings
   - Click "Storage" tab
   - Click "Connect Store"
   - Select your `peekasha-db` KV database
   - Click "Connect"
   - This automatically adds the KV environment variables

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live at: `https://your-project-name.vercel.app`

## Step 4: Initialize Database

1. **Visit your website**: `https://your-project-name.vercel.app`
2. **Visit any page** - this will automatically initialize the database with sample products
3. **Go to Admin**: `https://your-project-name.vercel.app/admin`
4. **Login with password**: `shreyariji1234123`
5. **Add your actual products** through the admin panel

## Step 5: Update Environment Variables (Optional)

After deployment, you can update the `NEXT_PUBLIC_APP_URL` to your actual domain:

1. Go to Project Settings → Environment Variables
2. Edit `NEXT_PUBLIC_APP_URL`
3. Change to: `https://your-actual-domain.vercel.app`
4. Click "Save"
5. Redeploy: Go to Deployments → Click "..." on latest → "Redeploy"

## Custom Domain (Optional)

To use your own domain (e.g., peekashajewell.com):

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

## Important Notes

### Data Storage
- **Vercel KV** stores all products and orders permanently
- Data persists across deployments
- No data loss when updating code

### Admin Access
- Admin URL: `https://your-site.vercel.app/admin`
- Password: `shreyariji1234123`
- Change this in Project Settings → Environment Variables if needed

### WhatsApp Integration
- Orders automatically open WhatsApp with order details
- WhatsApp number: +91 8115331054
- To change: Update `WHATSAPP_NUMBER` environment variable

### Image Uploads
- Product images are stored in `/public/uploads/`
- Images persist in Vercel deployments
- Consider using Cloudinary/Uploadcare for production-scale image hosting

### Security
- Admin password is stored in environment variables (secure)
- Never commit `.env.local` to Git (it's already in .gitignore)
- Keep your admin password private

## Troubleshooting

### Products Not Showing
- Make sure KV database is connected in Storage tab
- Visit the homepage once to trigger database initialization
- Check deployment logs for errors

### Admin Login Not Working
- Verify `ADMIN_PASSWORD` is set in environment variables
- Make sure you're using the exact password (case-sensitive)
- Try redeploying after setting environment variables

### Orders Not Saving
- Ensure KV database is connected
- Check browser console for errors
- Verify WhatsApp number is correct

### Build Errors
- Check deployment logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Try running `npm run build` locally first

## Updating Your Site

To update the website after making changes:

1. **Make changes locally**
2. **Test locally**: `npm run dev`
3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. **Automatic deployment**: Vercel auto-deploys on every push to main branch

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Vercel KV Documentation: https://vercel.com/docs/storage/vercel-kv

## Your Deployment Details

- **Project**: Peekasha Jewell
- **Admin Password**: shreyariji1234123
- **WhatsApp**: +91 8115331054
- **Email**: peekashajewell@gmail.com
- **Address**: E-400 KDA Colony Daheli Sujanpur, Kanpur 208015
- **GST**: 09AWIPJ6552E1ZE
