# 🦎 Chameleon

**Transform your marketing campaigns with AI-powered adaptation that evolves with your audience**

Chameleon is an intelligent advertising platform that uses AI to automatically generate contextual variations of your creative assets, ensuring your ads are perfectly adapted for different audiences, platforms, and contexts while maintaining brand consistency and accessibility standards.

## 🎯 What Chameleon Does

Chameleon revolutionizes digital advertising by solving one of the industry's biggest challenges: **contextual relevance at scale**. Instead of creating hundreds of ad variations manually, Chameleon uses advanced AI to:

- **Automatically generate contextual variations** of your ads for different website types (gaming, fitness, family, cooking, news, etc.)
- **Adapt messaging and visuals** to match the context where your ads will appear
- **Maintain brand consistency** across all variations using your brand guidelines
- **Generate accessibility features** including alt text, captions, and contrast reports
- **Provide performance analytics** and A/B testing insights

## 🚀 Key Features

### 👥 Dual-Role Authentication
- **Brand/Advertiser Portal** - Create and manage AI-powered ad campaigns
- **Publisher Portal** - Monetize your website with contextual ads
- Role-based dashboards with tailored features
- Secure authentication ready for Supabase integration

### 🤖 AI-Powered Creative Generation
- Upload a single seed creative (image + copy)
- Define your brand guidelines (colors, fonts, logos)
- Select target website contexts
- Generate unlimited contextual variations automatically

### 🎨 Contextual Adaptation
Transform one ad into multiple variations optimized for:
- **Gaming Websites** - Energy-focused messaging for gamers
- **Fitness & Sports** - Performance and health-oriented content
- **Family & Lifestyle** - Family-friendly messaging and visuals
- **Food & Cooking** - Culinary-focused adaptations
- **News & Media** - Professional, informative tone
- And many more contexts...

### ♿ Built-in Accessibility
Every generated variation includes:
- AI-generated alt text descriptions
- Color contrast analysis and reports
- Audio descriptions (where applicable)
- Accessibility compliance scoring

### 📊 Campaign Management
- **Dashboard** - Real-time performance metrics and analytics
- **Campaign Tracking** - Monitor spend, impressions, CTR, and conversions
- **Creative Library** - Organize and manage all your variations
- **A/B Testing** - Compare performance across different contexts

### 🎭 Brand Consistency
- Upload brand guidelines once
- Automatic brand compliance checking
- Consistent color palettes and typography
- Logo placement and sizing standards

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Styling**: TailwindCSS for responsive design
- **3D Graphics**: Three.js with React Three Fiber for immersive landing page
- **UI Components**: Custom component library with Radix UI primitives
- **Routing**: React Router for SPA navigation
- **Charts**: Recharts for analytics visualization
- **Icons**: Heroicons for consistent iconography

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   ├── layout/             # App layout and navigation
│   └── ui/                 # Reusable UI components
├── contexts/               # React contexts for state management
├── data/                   # Mock data and interfaces
├── hooks/                  # Custom React hooks
├── images/                 # Sample creative assets
├── lib/                    # Utility functions
└── pages/                  # Application pages
    ├── Landing.tsx         # 3D animated landing page
    ├── Dashboard.tsx       # Analytics dashboard
    ├── CreativeLibrary.tsx # Creative management
    ├── UploadCreative.tsx  # AI generation interface
    ├── CreativeDetail.tsx  # Detailed creative view
    ├── Campaigns.tsx       # Campaign management
    ├── Analytics.tsx       # Performance analytics
    └── Settings.tsx        # User preferences
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SauravHaldar04/Chameleon.git
   cd chameleon
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Authentication Features

Chameleon includes a complete authentication system with role-based access:

### User Roles
- **Brands/Advertisers**: Access creative management, campaign tools, and analytics
- **Publishers**: Access revenue dashboard, website management, and ad performance

### Authentication Pages
- **Sign Up**: Role-specific registration with tailored form fields
- **Sign In**: Secure login with role-based dashboard routing
- **Protected Routes**: Automatic redirection based on authentication state

### Supabase Integration Ready
The authentication system is structured for easy Supabase integration:
- `AuthContext` manages authentication state
- Mock authentication functions ready to be replaced with Supabase calls
- User data structure designed for Supabase database schema

To integrate with Supabase:
1. Install Supabase: `npm install @supabase/supabase-js`
2. Replace mock auth functions in `AuthContext.tsx` with Supabase calls
3. Update user data structure to match your Supabase schema

## 💻 Development

### Building for Production

```bash
npm run build
```

The build folder will contain the optimized production files ready for deployment.

## 🎨 How It Works

### For Brands/Advertisers

### 1. Sign Up & Account Setup
- Choose "Brand" during registration
- Provide company information and industry details
- Access the brand dashboard with campaign management tools

### 2. Upload Your Seed Creative
- Upload your brand logo and original creative asset
- Define your brand guidelines (colors, fonts)
- Write a description or prompt for AI generation

### 3. Select Target Contexts
Choose from various website types where your ads will appear:
- Gaming communities and esports platforms
- Health and fitness websites
- Family-oriented content sites
- Food and cooking websites
- News and media platforms

### 4. AI Generation Process
Chameleon's AI engine:
1. Analyzes your brand identity and guidelines
2. Processes contextual requirements for each selected website type
3. Generates tailored variations with appropriate messaging
4. Creates accessibility features automatically
5. Optimizes for each platform's audience

### 5. Review and Deploy
- Browse generated variations in your Creative Library
- Compare performance with A/B testing
- Download assets for campaign deployment
- Monitor performance through the Analytics dashboard

### For Publishers

### 1. Publisher Registration
- Choose "Publisher" during sign-up
- Provide website details (name, URL, category, traffic)
- Describe your content and audience

### 2. Website Integration
- Get your ad placement code
- Choose optimal ad positions on your site
- Configure contextual matching preferences

### 3. Revenue Optimization
- AI matches ads to your content automatically
- Track performance through publisher dashboard
- Optimize ad placement for maximum revenue

## 📊 Sample Use Cases

### E-commerce Brand
A sportswear company uploads their new sneaker ad:
- **Original**: "New Air Max - Just Do It"
- **Gaming Context**: "Level Up Your Game - Performance Footwear for Gamers"
- **Fitness Context**: "Transform Your Workout - Premium Athletic Performance"
- **Street Fashion**: "Street Style Revolution - Step Up Your Game"

### Food & Beverage Brand
A soft drink company uploads their refreshment ad:
- **Original**: "Ice Cold Cola - The Perfect Refreshment"
- **Sports Context**: "Refresh Your Victory - Fuel for Champions"
- **Family Context**: "The Perfect Companion for Your Family Outing"
- **Gaming Context**: "Level Up Your Game Break - Cola Power"

## 🌟 Key Benefits

- **Scalability**: Generate hundreds of variations from a single creative
- **Efficiency**: Reduce creative production time by 90%
- **Relevance**: Contextually appropriate messaging increases engagement
- **Accessibility**: Built-in compliance with web accessibility standards
- **Consistency**: Maintain brand guidelines across all variations
- **Performance**: Data-driven insights for continuous optimization

## 🚀 Deployment

The application is deployed on Render with automatic builds from the main branch. The production build includes optimized assets and proper routing configuration.

### Deployment Configuration
- **Build Command**: `npm install --legacy-peer-deps && npm run build`
- **Publish Directory**: `./build`
- **Static Site Routing**: Configured for single-page application

## 🤝 Contributing

We welcome contributions to make Chameleon even better! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Three.js community for amazing 3D web capabilities
- React team for the robust framework
- TailwindCSS for the excellent styling system
- The open-source community for the various libraries used

---

**Made with ❤️ for the future of contextual advertising**

Transform your marketing today with Chameleon - where AI meets creativity! 🦎✨

## Available Scripts (Development)

In the project directory, you can run:

### `npm start`
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder with optimized performance.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
