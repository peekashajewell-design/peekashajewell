# 🚀 Deployment Guide for Peekasha Jewell

## Quick Start: Deploy to Vercel in 5 Minutes

### Step 1: Prepare Your Code

Make sure all your code is committed to Git:

\`\`\`bash
git init
git add .
git commit -m "Initial commit: Peekasha Jewell jewelry website"
\`\`\`

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository named `peekashajewell`
3. Don't initialize with README (you already have one)
4. Click "Create repository"

### Step 3: Push to GitHub

\`\`\`bash
git remote add origin https://github.com/YOUR_USERNAME/peekashajewell.git
git branch -M main
git push -u origin main
\`\`\`

### Step 4: Deploy on Vercel

#### Option A: Via Web (Easiest)

1. Go to [vercel.com/signup](https://vercel.com/signup)
2. Sign up with GitHub
3. Click **"New Project"**
4. Find and select your `peekashajewell` repository
5. Vercel will auto-detect Next.js settings
6. Click **"Deploy"**
7. Wait ~2 minutes for deployment ✨

#### Option B: Via CLI

\`\`\`bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy
cd /path/to/peekashajewell
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - What's your project's name? peekashajewell
# - In which directory is your code located? ./
# - Want to override the settings? No

# Deploy to production
vercel --prod
\`\`\`

### Step 5: Configure Environment Variables

After deployment, add environment variables:

1. Go to your Vercel dashboard
2. Select your project
3. Click **"Settings"** → **"Environment Variables"**
4. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `ADMIN_PASSWORD` | `admin123` (change this!) | Production, Preview, Development |
| `WHATSAPP_NUMBER` | `918115331054` | Production, Preview, Development |

5. Click **"Save"**
6. Go to **"Deployments"** and click **"Redeploy"** to apply changes

---

## 🎉 You're Live!

Your website is now live at:
- **Production URL**: `https://peekashajewell.vercel.app`
- **Custom domain**: Add your own domain in Vercel settings

---

## 📱 Test Your Website

### Test the Frontend:
1. Visit your Vercel URL
2. Browse products
3. Add items to cart
4. Complete checkout

### Test the Admin Panel:
1. Go to `https://your-url.vercel.app/admin`
2. Login with password: `admin123`
3. Add a product with images
4. View orders

### Test WhatsApp Integration:
1. Place a test order
2. Verify WhatsApp link opens correctly
3. Check order details in message

---

## 🔧 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

\`\`\`bash
# Make changes to your code
git add .
git commit -m "Update: Added new features"
git push

# Vercel will automatically:
# 1. Detect the push
# 2. Build your site
# 3. Deploy to production
# 4. Done! 🎉
\`\`\`

---

## 🎨 Custom Domain (Optional)

### Add Your Own Domain:

1. Buy a domain from:
   - Namecheap
   - GoDaddy
   - Google Domains
   - Cloudflare

2. In Vercel:
   - Go to **Settings** → **Domains**
   - Click **"Add"**
   - Enter your domain: `www.peekashajewell.com`
   - Follow DNS configuration instructions

3. Update DNS records with your registrar:
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.21.21`

4. Wait 24-48 hours for DNS propagation

---

## 🗄️ Upgrade to Database (Optional)

Currently, data is stored in memory (resets on redeploy). To persist data:

### Option 1: Vercel KV (Redis)

\`\`\`bash
# Install Vercel KV
vercel link
vercel env pull
\`\`\`

Add to your project:
- Vercel KV (Redis) for products/orders
- Free tier: 30,000 requests/day

### Option 2: Vercel Postgres

- Vercel Postgres for relational data
- Free tier: 256 MB storage

### Option 3: MongoDB Atlas

- MongoDB Atlas free tier
- 512 MB storage
- Add connection string to env variables

---

## 🔐 Security Best Practices

1. **Change Admin Password:**
   - Update `ADMIN_PASSWORD` in Vercel env variables
   - Use strong password (16+ characters)

2. **Environment Variables:**
   - Never commit `.env.local` to Git
   - All secrets in Vercel dashboard only

3. **API Security:**
   - Admin routes check authorization
   - WhatsApp number validated

---

## 📊 Monitoring & Analytics

### View Deployment Logs:
1. Go to Vercel dashboard
2. Select your project
3. Click **"Deployments"**
4. Click any deployment to see logs

### Add Analytics:
1. In Vercel dashboard
2. Go to **"Analytics"**
3. Enable Vercel Analytics (free)
4. Track visitors, page views, performance

---

## 🆘 Troubleshooting

### Build Fails?
\`\`\`bash
# Test locally first
npm run build

# Check for errors
npm run lint
\`\`\`

### Environment Variables Not Working?
1. Verify variables are set in Vercel
2. Redeploy after adding variables
3. Check variable names are exact

### Images Not Loading?
1. Check image URLs are accessible
2. Verify Next.js image domains in `next.config.mjs`
3. Use relative paths for uploaded images

### WhatsApp Link Not Working?
1. Verify `WHATSAPP_NUMBER` format: `918115331054`
2. No spaces, no `+` sign
3. Test link manually first

---

## 💡 Tips

- **Preview Deployments**: Every branch push creates a preview URL
- **Rollback**: Click any previous deployment to rollback
- **Logs**: View real-time function logs in Vercel dashboard
- **Performance**: Vercel Edge Network = instant loading worldwide

---

## 📞 Support

Need help? Contact:
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

---

**Congratulations! Your jewelry website is now live! 🎉💍**
