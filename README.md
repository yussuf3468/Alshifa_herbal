# Al-Shifa Herbal 🌿 - Trusted Herbal Wellness Shop in Eastleigh, Nairobi Kenya

[![Live Site](https://img.shields.io/badge/Live-Al--Shifa%20Herbal-green?style=for-the-badge)](https://alshifa.lenzro.com)
[![Made in Kenya](https://img.shields.io/badge/Made%20in-Kenya%20🇰🇪-green?style=for-the-badge)](https://alshifa.lenzro.com)
[![Contact](https://img.shields.io/badge/Call-%2B254%20722%20979%20547-blue?style=for-the-badge)](tel:+254722979547)
[![Powered by Lenzro](https://img.shields.io/badge/Powered%20by-Lenzro-amber?style=for-the-badge)](https://lenzro.com)

> 🏆 **Your Trusted Herbal Wellness Shop in Eastleigh, Nairobi** - Natural herbal remedies, wellness teas, raw honey, essential oils, and immunity boosters. Serving 10,000+ satisfied families & customers!

## 🌟 About Al-Shifa Herbal

Al-Shifa Herbal is your trusted herbal wellness shop in Eastleigh, Nairobi Kenya. We specialize in providing natural, high-quality herbal remedies, wellness teas, raw honey, essential oils, supplements and immunity boosters to families, clinics, resellers, and health-conscious customers across Kenya.

**Why Choose Us:**

- ✅ Verified Authentic Products
- ✅ Expert Guidance & Support
- ✅ Competitive Prices
- ✅ Secure Online Checkout
- ✅ Reliable Delivery Services
- ✅ 10,000+ Satisfied Customers

### 📍 Location

**Global Apartments, Section One, Eastleigh, Nairobi, Kenya**

### 📞 Contact Information

- **Phone:** [+254 722 979 547](tel:+254722979547)
- **Email:** [yussufh080@gmail.com](mailto:yussufh080@gmail.com)
- **Opening Hours:** Monday - Sunday, 8:00 AM - 8:00 PM

## 🛒 What We Offer

### 📚 Textbooks & Educational Books

- Primary School Books
- Secondary School Textbooks
- University & College Books
- Reference Materials
- Educational Guides
- 10,000+ Books in Stock

### ✏️ Stationery & School Supplies

- Writing Materials (Pens, Pencils, Markers)
- Notebooks & Exercise Books
- Art Supplies
- School Bags & Accessories
- Office Supplies

### 💻 Electronics & Technology

- Calculators (Scientific & Graphing)
- USB Drives & Memory Cards
- Computer Accessories
- Educational Electronics
- Tech Accessories

### 🎒 School Accessories

- School Uniforms
- Sports Equipment
- Laboratory Equipment
- Educational Toys & Games
- Backpacks & Lunch Boxes

## ✨ Features

### 📊 Core Functionality

- **Inventory Management** - Track products, stock levels, and reorder alerts
- **Sales Management** - Process sales, manage orders, and track revenue
- **Cyber Services** - Track income from cyber café services (photocopy, printing, scanning, editing, etc.)
- **Financial Tracking**
  - Initial Investment tracking
  - Automatic dividend calculation for investors
  - Debt Management with payment schedules
  - Expense Management and categorization
  - Comprehensive financial reports
- **Customer Portal** - Modern e-commerce interface for customers
- **Order Management** - Track orders from placement to delivery
- **User Authentication** - Secure login and role-based access
- **User Activity Dashboard** - Monitor staff activities and system usage

### 🎨 Modern Dark Glassmorphic UI

- Beautiful dark theme with glassmorphic effects
- **Collapsible Sidebar Navigation** (Desktop) - Default collapsed for maximum screen space
  - Smooth expand/collapse transitions
  - Icon-only view when collapsed
  - Enhanced toggle button with glow effects
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Compact Layout** - Reduced spacing and padding for better content density
- Component-specific color theming:
  - Emerald/Green for investments & profits
  - Cyan/Blue for cyber services
  - Red/Rose for debts
  - Purple/Pink for general UI
- Backdrop blur and translucent panels
- Gradient accents and hover effects
- Hidden scrollbars for cleaner appearance

## 🚀 Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS 3
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Build Tool:** Vite
- **Icons:** Lucide React
- **State Management:** React Context API
- **Date Formatting:** Custom utility functions for dd/mm/yyyy format
- **Automated Backups:** GitHub Actions (nightly database backups)

### Compliance & Store Readiness

- **Privacy Policy:** [public/privacy.html](./public/privacy.html) and [PRIVACY_POLICY.md](./PRIVACY_POLICY.md)
- **Android Assets:** Generated via @capacitor/assets (icons/splash)
- **Release Guides:** ANDROID_QUICK_START.md, ANDROID_RELEASE_GUIDE.md
- **Hosted Domain:** finance.lenzro.com (Vercel)

## 🔐 Automated Database Backups

This project includes **automated nightly backups** of your Supabase database using GitHub Actions.

### Features:

- ⏰ **Scheduled Backups** - Runs every night at 2:00 AM UTC
- 📦 **Triple Backup** - Schema, data, and full backups
- 💾 **30-Day Retention** - Stored as GitHub artifacts
- 🔄 **Manual Trigger** - Run backups anytime via GitHub Actions
- 📊 **Backup Reports** - Detailed logs for each backup
- ☁️ **Optional Cloud Storage** - Supports AWS S3, Google Cloud, Azure

### Quick Setup:

1. Add these secrets to your GitHub repository:
   - `SUPABASE_ACCESS_TOKEN`
   - `SUPABASE_PROJECT_ID`
   - `SUPABASE_DB_PASSWORD`
2. Backups run automatically every night
3. Download backups from GitHub Actions → Artifacts

📖 **Full Documentation:** See [`BACKUP_SETUP_GUIDE.md`](./BACKUP_SETUP_GUIDE.md) for detailed setup instructions, restore procedures, and best practices.

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yussuf3468/TopGearLandingPage.git
cd TopGearLandingPage/bookStore
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:

- Run the SQL scripts in order:
  1. `SUPABASE_FULL_BOOTSTRAP.sql` - Main database schema
  2. `SUPABASE_FINANCIALS.sql` - Financial tables
  3. `SUPABASE_PATCH_*.sql` - Any patches as needed

5. Start the development server:

```bash
npm run dev
```

## 🏗️ Project Structure

```
bookStore/
├── src/
│   ├── components/           # React components
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── Inventory.tsx     # Product management
│   │   ├── Sales.tsx         # Sales tracking
│   │   ├── InitialInvestment.tsx  # Investment tracking
│   │   ├── DebtManagement.tsx     # Debt tracking
│   │   ├── ExpenseManagement.tsx  # Expense tracking
│   │   ├── CustomerStoreNew.tsx   # Customer interface
│   │   └── ...
│   ├── contexts/            # React contexts
│   ├── lib/                 # Utilities and configs
│   ├── types/               # TypeScript types
│   └── styles/              # Style utilities
├── public/                  # Static assets
└── SQL scripts/             # Database setup scripts
```

## 📱 Key Components

### Admin Dashboard

- **StatCards** - Real-time financial metrics
- **Reports** - Comprehensive financial reports
- **User Activity** - Track system usage

### Inventory Management

- Product CRUD operations
- Image upload and management
- Stock level alerts
- Category management
- Detailed product view modal

### Financial Management

- **Initial Investment** - Track startup capital and sources
- **Debt Management** - Monitor loans and repayment schedules
- **Expense Management** - Categorize and track business expenses
- Real-time financial analytics

### Customer Store

- Beautiful product showcase
- Advanced search with suggestions
- Shopping cart with glassmorphic design
- Checkout with delivery address selector
- Order tracking

## 🎨 Design System

### Colors

- **Background:** Dark gradient (`from-slate-900 via-purple-900 to-slate-900`)
- **Glass Panels:** `bg-white/10 backdrop-blur-xl border-white/20`
- **Text Hierarchy:**
  - Primary: `text-white`
  - Secondary: `text-slate-300`
  - Tertiary: `text-slate-400`
- **Accents:**
  - Investment/Profit: Emerald/Green
  - Cyber Services: Cyan/Blue
  - Debts: Red/Rose
  - General: Purple/Pink

### Components

- Glassmorphic cards with backdrop blur
- Gradient buttons and badges
- Smooth hover transitions
- Responsive layouts
- Collapsible sidebar navigation
- Compact spacing for optimal screen utilization

## 🚀 Deployment

### Prerequisites

- Node.js 18+ installed
- Supabase account with project created
- Database tables created and configured

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
3. Configure environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click "Deploy"

### Deploy to Netlify

1. Build the project:

```bash
npm run build
```

2. Deploy to Netlify:
   - Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or use Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Manual Deployment

1. Build the production bundle:

```bash
npm run build
```

2. The `dist` folder contains all static files ready for deployment
3. Upload to any static hosting service (AWS S3, Azure, etc.)

### Environment Variables

Required for production:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔐 Security

- Row Level Security (RLS) policies on all tables
- Secure authentication with Supabase Auth
- Role-based access control (Admin/Staff)
- Protected admin routes
- Secure environment variables

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance

- Lazy loading for images
- Code splitting with Vite
- Optimized bundle size
- Fast refresh during development
- Production-ready build with minification

## 📈 Recent Updates (Latest Commit)

✅ **UI Enhancement: Compact Layout**

- Collapsible sidebar navigation (default collapsed)
- Reduced spacing and font sizes across all components
- Fixed mobile navbar overlap
- Enhanced toggle button visibility
- Improved text display in stat cards

## 📈 Future Enhancements

- [ ] Mobile apps (iOS/Android)
- [ ] Advanced analytics and AI insights
- [ ] Barcode scanning for inventory
- [ ] Email notifications
- [ ] Multi-language support (Somali/English)
- [ ] PDF report generation
- [ ] Integration with payment gateways
- [ ] Offline mode with PWA

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary to Al-Shifa Herbal.

## 👨‍💻 Developer

Created by Yussuf Muse

- GitHub: [@yussuf3468](https://github.com/yussuf3468)
- Email: info@alshifaherbal.co.ke

## 🙏 Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Powered by Supabase
- Icons by Lucide

---

**Al-Shifa Herbal** - Modern, Beautiful, and Powerful Financial Management 💼✨
