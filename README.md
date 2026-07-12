# 🧘 Calmborg

> A modern Next.js-based e-commerce website with intelligent product management and dynamic image generation.

[![TypeScript](https://img.shields.io/badge/TypeScript-69.7%25-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-000000?logo=nextjs)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](#license)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## ✨ Features

- **🎨 Dynamic Image Generation** - Generate optimized product images using Canvas
- **🏬 Product Management** - Comprehensive product catalog and category system
- **📊 Data Auditing** - Built-in scripts for validating and auditing product data
- **🔍 Product Search** - Intelligent product discovery with filtering
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **⚡ High Performance** - Built on Next.js for optimized server-side rendering
- **🎯 Type-Safe** - Full TypeScript support throughout the codebase

---

## 🛠 Tech Stack

| Technology | Version | Usage |
|-----------|---------|-------|
| **Next.js** | 16.2.10 | Framework & routing |
| **React** | 19.2.4 | UI components |
| **TypeScript** | ^5 | Type safety |
| **Tailwind CSS** | ^4 | Styling |
| **Canvas** | ^3.2.3 | Image generation |
| **Lucide React** | ^1.24.0 | Icons |
| **ESLint** | ^9 | Code quality |

**Language Composition:**
- TypeScript: 69.7%
- JavaScript: 16.2%
- HTML: 12.1%
- CSS: 2%

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kolavara/Calmborg.git
   cd Calmborg
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
Calmborg/
├── src/                           # Source code
│   ├── app/                       # Next.js app router
│   ├── components/                # React components
│   └── lib/                       # Utility functions
├── public/                        # Static assets
├── node_modules/                  # Dependencies
├── package.json                   # Project configuration
├── tsconfig.json                  # TypeScript config
├── next.config.ts                 # Next.js config
├── tailwind.config.ts             # Tailwind configuration
├── postcss.config.mjs             # PostCSS config
└── eslint.config.mjs              # ESLint rules

Utility Scripts:
├── generate-images.js             # Generate product images
├── generate-better-images.js      # Enhanced image generation
├── fetch-home.js                  # Fetch homepage data
├── fetch-orion-products.js        # Fetch product catalog
├── fetch-orion-categories.js      # Fetch categories
├── audit-all-products.js          # Validate product data
├── check-missing-images.js        # Find missing images
└── [other utility scripts]        # Data management tools
```

---

## 📜 Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint for code quality
npm run lint
```

### Data Management & Utilities

```bash
# Generate product images
node generate-images.js
node generate-better-images.js

# Fetch data
node fetch-home.js
node fetch-orion-products.js
node fetch-orion-categories.js

# Audit and validate
node audit-all-products.js
node check-missing-images.js
node check-missing.js
node check-brands.js

# Manage images
node add-missing-images.js
node rename-images.js
node list-all-images.js
```

---

## 💻 Development

### Code Quality

The project enforces code quality through ESLint with Next.js recommended rules:

```bash
npm run lint
```

### Styling

Tailwind CSS v4 with PostCSS is configured for rapid UI development:

```json
{
  "@tailwindcss/postcss": "^4",
  "tailwindcss": "^4"
}
```

### TypeScript

Full type safety with strict mode enabled. See `tsconfig.json` for configuration details.

---

## 🌐 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy your Next.js app is using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&utm_source=create-next-app&utm_campaign=create-next-app):

1. Push your code to a Git repository
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Your app will be deployed with every push to the main branch

### Alternative Deployment Options

- **Render.com** - See `render.yaml` for configuration
- **Docker** - Can be containerized for any hosting platform
- **Self-hosted** - Run `npm run build && npm start` on any Node.js server

For detailed deployment documentation, see [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- [React Documentation](https://react.dev) - Explore React capabilities
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript reference

---

## 👤 Author

**Kolavara** - [GitHub Profile](https://github.com/Kolavara)

---

## 📧 Support

For issues, questions, or suggestions, please [open an issue](https://github.com/Kolavara/Calmborg/issues) on GitHub.

---

<div align="center">

**Made with ❤️ by Kolavara**

</div>
