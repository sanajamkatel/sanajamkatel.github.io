# Sana's Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Framer Motion, and Tailwind CSS. Features smooth animations, interactive components, and a beautiful design inspired by your original banner.

## 🚀 Features

- **Modern Design**: Clean, professional layout with your custom color scheme (#f590f1)
- **Smooth Animations**: Framer Motion animations throughout the site
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Interactive Components**: Hover effects, form validation, and dynamic content
- **Custom Font**: Reem Kufi font for a unique typography
- **Sections**: Hero, About, Projects, Interests, and Contact

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd sana_portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🎨 Customization

### Colors
The primary color is set to `#f590f1` (pink) as requested. You can modify colors in:
- `tailwind.config.js` - Main color definitions
- `src/index.css` - Custom CSS variables

### Content
Update the following files to personalize your portfolio:

#### Personal Information
- **Hero Section** (`src/components/Hero.tsx`): Update name, description, and resume link
- **About Section** (`src/components/About.tsx`): Modify bio, skills, and education
- **Contact Section** (`src/components/Contact.tsx`): Update contact details and social links

#### Projects
- **Projects Section** (`src/components/Projects.tsx`): Add your actual projects with:
  - Project images
  - Descriptions
  - Technologies used
  - GitHub and live demo links

#### Interests
- **Interests Section** (`src/components/Interests.tsx`): Customize:
  - Hobbies and interests
  - Fun facts about yourself
  - Current obsessions

### Images
Replace placeholder images with your own:
- Project screenshots
- Profile pictures
- Custom illustrations

## 📱 Sections Overview

### 1. Hero Section
- Animated introduction with your name
- Download resume button
- GitHub link
- Animated cartoon character
- Scroll indicator

### 2. About Section
- Personal bio and background
- Education information
- Skills and technologies
- Professional interests

### 3. Projects Section
- Filterable project grid
- Project categories (Web, AI, Mobile, Games, Data)
- Featured projects highlighting
- Technology tags
- Links to code and live demos

### 4. Interests Section
- Hobbies and personal interests
- Fun facts about yourself
- Current obsessions
- Interactive cards with animations

### 5. Contact Section
- Contact form with validation
- Contact information
- Social media links
- Professional networking

## 🎯 Key Features

### Animations
- Scroll-triggered animations
- Hover effects on cards and buttons
- Smooth page transitions
- Floating character animation

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Optimized navigation

### Performance
- Lazy loading for images
- Optimized animations
- Efficient re-renders
- Fast loading times

## 🔧 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📄 Deployment

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect React settings
3. Deploy with one click

### GitHub Pages
1. Add `"homepage": "https://yourusername.github.io/repo-name"` to package.json
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy scripts to package.json
4. Run `npm run deploy`

## 🎨 Design System

### Colors
- **Primary**: #f590f1 (Pink)
- **Primary Light**: #f7a8f3
- **Primary Dark**: #e672e0
- **Olive Green**: #556B2F (from original design)
- **Background**: Gray scale variations

### Typography
- **Font**: Reem Kufi (Google Fonts)
- **Weights**: 400, 500, 600, 700
- **Sizes**: Responsive scaling

### Spacing
- Consistent padding and margins
- Responsive grid system
- Proper component spacing

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by your original portfolio banner design
- Built with modern web technologies
- Designed for performance and accessibility

---

**Happy coding! 🚀**

For questions or support, feel free to reach out through the contact form on the website.
