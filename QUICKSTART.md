# 🚀 Quick Start Guide - Peekasha Jewell

## ✅ Your Website is Ready!

Your professional jewelry e-commerce website is fully built and ready to deploy!

---

## 📦 What's Included?

✨ **Frontend Features:**
- Beautiful home page with hero section
- Product catalog with category filtering
- Shopping cart with quantity management
- Checkout flow with customer details
- Order success page
- Responsive design (mobile, tablet, desktop)

👨‍💼 **Admin Panel:**
- Secure login (/admin)
- Add/Edit/Delete products
- Upload product images
- View and manage orders
- Mark products as featured

📱 **WhatsApp Integration:**
- Orders automatically sent to: **+91 81153 31054**
- Direct contact link for customers

---

## 🏃 Run Locally (Test Before Deploy)

\`\`\`bash
# Start development server
npm run dev

# Open in browser
open http://localhost:3000
\`\`\`

### Test These Pages:
- **Home**: http://localhost:3000
- **Products**: http://localhost:3000/products
- **Admin**: http://localhost:3000/admin (password: admin123)

---

## 🚀 Deploy to Vercel (5 Minutes)

### Step 1: Push to GitHub

\`\`\`bash
cd /Users/sumit.jaiswal/Desktop/PersonalWork/peekashajewell

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Peekasha Jewell website"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/peekashajewell.git
git branch -M main
git push -u origin main
\`\`\`

### Step 2: Deploy on Vercel

1. Go to **[vercel.com/signup](https://vercel.com/signup)**
2. Sign up with GitHub
3. Click **"New Project"**
4. Import `peekashajewell` repository
5. Click **"Deploy"** (auto-detects Next.js settings)
6. Wait 2-3 minutes ⏳
7. **Done!** Your site is live! 🎉

### Step 3: Add Environment Variables

1. In Vercel dashboard → Your project → **Settings** → **Environment Variables**
2. Add:
   - `ADMIN_PASSWORD` = `your_secure_password` (change from admin123!)
   - `WHATSAPP_NUMBER` = `918115331054`
3. Go to **Deployments** → Click **"Redeploy"**

---

## 🎨 Customize Your Website

### Change Colors:
Edit `tailwind.config.ts` - modify the `primary` and `gold` color schemes

### Change WhatsApp Number:
Update in `.env.local` for local testing
Update in Vercel for production

### Add More Products:
1. Go to /admin
2. Login
3. Click "Add Product"
4. Upload images, add details
5. Save!

### Update Content:
- Home page text: `app/page.tsx`
- About section: `components/About.tsx`
- Footer: `components/Footer.tsx`

---

## 📂 Project Structure

\`\`\`
peekashajewell/
├── app/
│   ├── page.tsx              # Home page
│   ├── products/             # Product pages
│   ├── cart/                 # Shopping cart
│   ├── checkout/             # Checkout flow
│   ├── admin/                # Admin dashboard
│   └── api/                  # Backend APIs
├── components/               # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── admin/               # Admin components
├── lib/                      # Utilities
│   ├── db.ts                # Database operations
│   └── whatsapp.ts          # WhatsApp integration
├── store/                    # State management
│   └── cartStore.ts         # Shopping cart state
└── public/                   # Static files
    └── uploads/             # Product images
\`\`\`

---

## 🔐 Admin Access

**URL**: https://your-site.vercel.app/admin

**Default Password**: `admin123` 

**⚠️ IMPORTANT**: Change this password in production!

### Admin Features:
- ✅ Add/edit/delete products
- ✅ Upload product images
- ✅ Set featured products
- ✅ View all orders
- ✅ Contact customers via WhatsApp

---

## 📱 How Orders Work

1. Customer adds items to cart
2. Customer fills checkout form
3. Order is created
4. **WhatsApp link opens automatically** with order details
5. Admin receives order on WhatsApp: +91 81153 31054
6. Admin confirms via WhatsApp
7. Payment & shipping discussed directly

---

## 🎯 Next Steps

### 1. Test Everything Locally
\`\`\`bash
npm run dev
\`\`\`
- Add test products in admin
- Place a test order
- Check WhatsApp link works

### 2. Deploy to Vercel
- Follow steps above
- Get your live URL

### 3. Share Your Website
- Your site will be at: `https://peekashajewell.vercel.app`
- Add custom domain (optional)

### 4. Add Real Products
- Login to admin panel
- Upload product photos
- Add descriptions and prices

---

## 💡 Pro Tips

1. **Sample Products**: The site comes with 4 sample products using Unsplash images
2. **Image Uploads**: Upload high-quality jewelry photos for best results
3. **WhatsApp Testing**: Test the WhatsApp link before going live
4. **Mobile First**: The site is fully responsive - test on mobile!
5. **Featured Products**: Mark your best sellers as "featured" for homepage display

---

## 🆘 Need Help?

### Common Issues:

**Build fails?**
\`\`\`bash
npm run build
# Fix any errors shown
\`\`\`

**WhatsApp not working?**
- Check phone number format: 918115331054 (no + or spaces)
- Verify number in environment variables

**Admin can't login?**
- Check ADMIN_PASSWORD in Vercel environment variables
- Redeploy after adding variables

**Images not loading?**
- Check image URLs are accessible
- For uploaded images, ensure `/public/uploads` exists

---

## 📞 Support

- **WhatsApp**: +91 81153 31054
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

---

**🎉 Congratulations! Your jewelry website is ready to launch!**

Start by running `npm run dev` to test locally, then deploy to Vercel!
