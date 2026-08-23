# Peekasha Jewell - Jewelry E-commerce Website

A professional, modern jewelry e-commerce website built with Next.js, React, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog** - Browse jewelry by categories (Rings, Necklaces, Earrings, Bracelets, Anklets, Sets)
- 🛒 **Shopping Cart** - Add products to cart with quantity management
- 📱 **WhatsApp Integration** - Orders are sent directly to WhatsApp (+91 81153 31054)
- 👨‍💼 **Admin Panel** - Secure admin dashboard for managing products and orders
- 📸 **Image Upload** - Upload multiple product images
- 📦 **Order Management** - Track and manage customer orders
- 💎 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Fast Performance** - Built with Next.js for optimal performance

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd peekashajewell
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update the `.env.local` file with your settings:
\`\`\`env
ADMIN_PASSWORD=your_secure_password
WHATSAPP_NUMBER=918115331054
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Access

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Default Password: `admin123` (change this in production!)

### Admin Features:
- Add/Edit/Delete products
- Upload product images
- View and manage orders
- Mark products as featured

## 🚀 Deployment to Vercel (Recommended)

This website is optimized for deployment on Vercel. Follow these steps:

### Method 1: Deploy via GitHub (Easiest)

1. **Push your code to GitHub:**
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/peekashajewell.git
git push -u origin main
\`\`\`

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Click "New Project"
   - Import your `peekashajewell` repository
   - Click "Deploy"
   - That's it! ✨

3. **Configure Environment Variables:**
   - In Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add these variables:
     - `ADMIN_PASSWORD`: Your secure admin password
     - `WHATSAPP_NUMBER`: 918115331054

### Method 2: Deploy via CLI

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Or deploy to production
vercel --prod
\`\`\`

### After Deployment

- Your website will be live at: `https://your-project-name.vercel.app`
- Add a custom domain in Vercel settings (optional)
- Vercel automatically deploys on every push to main branch

### Benefits of Vercel:
✅ Automatic HTTPS
✅ Global CDN
✅ Automatic deployments
✅ Serverless functions
✅ Perfect Next.js optimization
✅ Free SSL certificates
✅ **100% Free for this project!**

## Project Structure

\`\`\`
peekashajewell/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin pages
│   ├── api/               # API routes
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── products/          # Product pages
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                   # Utility functions
│   ├── db.ts             # Database operations
│   └── whatsapp.ts       # WhatsApp integration
├── store/                 # State management (Zustand)
├── types/                 # TypeScript types
└── public/               # Static files
    └── uploads/          # Uploaded product images
\`\`\`

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Zustand** - State management
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications

## Features to Add (Optional)

- [ ] Payment gateway integration
- [ ] User authentication and accounts
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Search and filter products
- [ ] Product recommendations
- [ ] Analytics dashboard

## Support

For any issues or questions, please contact:
- Phone: +91 81153 31054
- Email: info@peekashajewell.com

## License

Copyright © 2026 Peekasha Jewell. All rights reserved.
