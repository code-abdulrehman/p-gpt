# Contributing to P-GPT

Thank you for your interest in contributing to P-GPT! We welcome contributions from the community and are excited to see what you'll build with us.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Branch Structure](#branch-structure)
- [Development Workflow](#development-workflow)
- [Making Changes](#making-changes)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Code Guidelines](#code-guidelines)
- [Documentation](/README.md)
- [Release Process](#release-process)
- [Community](#community)

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome newcomers and help them learn
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that everyone is learning and growing
- **Be collaborative**: Work together towards common goals

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **pnpm** (v8.0.0 or higher) - This project uses pnpm as package manager
- **Git** (v2.25.0 or higher)

### Fork and Clone

1. **Fork the repository** on GitHub by clicking the "Fork" button
2. **Clone your fork** to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/p-gpt.git
cd p-gpt
```

3. **Add the upstream remote**:

```bash
git remote add upstream https://github.com/code-abdulrehman/p-gpt.git
```

4. **Verify your remotes**:

```bash
git remote -v
# origin    https://github.com/YOUR_USERNAME/p-gpt.git (fetch)
# origin    https://github.com/YOUR_USERNAME/p-gpt.git (push)
# upstream  https://github.com/code-abdulrehman/p-gpt.git (fetch)
# upstream  https://github.com/code-abdulrehman/p-gpt.git (push)
```

## 🛠️ Development Setup

### 1. Install Dependencies

```bash
# Install project dependencies
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory (optional for development):

```bash
# Copy the example environment file if exists
cp .env .env.local
```

Add your API keys for testing (optional):

```env
# OpenAI API Key (for testing)
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Gemini API Key (for testing)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start Development Server

```bash
# Start the development server (for demo/landing page)
pnpm dev
```

The development server will start at `http://localhost:5173`.

### 4. Build the Project

```bash
# Build the library for production
pnpm build

# Build with Vite (alternative build for development)
pnpm build:vite
```

## 🌿 Branch Structure

Our repository uses a two-branch workflow:

### Main Branches

- **`package`** (Main Branch)
  - Contains the stable, production-ready library code
  - Used for NPM package releases
  - Protected branch with required PR reviews
  - All releases are tagged from this branch

- **`staging`** (Website Branch)
  - Contains the demo website and documentation
  - Used for the live demo site deployment
  - Includes the latest features and examples
  - Deployed automatically to the demo website

### Feature Branches

Create feature branches from the appropriate base branch:

```bash
# For library features/fixes (base: package)
git checkout package
git pull upstream package
git checkout -b feature/your-feature-name

# For website/demo features (base: staging)
git checkout staging
git pull upstream staging
git checkout -b demo/your-demo-feature
```

### Branch Naming Convention

- **Features**: `feature/descriptive-name`
- **Bug fixes**: `fix/issue-description`
- **Documentation**: `docs/update-description`
- **Website/Demo**: `demo/feature-description`
- **Hotfixes**: `hotfix/critical-fix`

## 🔄 Development Workflow

### 1. Sync with Upstream

Always start by syncing with the upstream repository:

```bash
# Fetch latest changes
git fetch upstream

# Switch to the appropriate base branch
git checkout package  # or staging

# Merge upstream changes
git merge upstream/package  # or upstream/staging

# Push to your fork
git push origin package  # or staging
```

### 2. Create a Feature Branch

```bash
# Create and switch to a new feature branch
git checkout -b feature/amazing-new-feature

# Or for demo/website changes
git checkout -b demo/improved-landing-page
```

### 3. Make Your Changes

Follow our [Code Guidelines](#code-guidelines) while making changes.

### 4. Commit Your Changes

Use conventional commit messages:

```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add new theme customization options"

# Or for fixes
git commit -m "fix: resolve theme switching bug in dark mode"
```

#### Commit Message Convention

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

### 5. Push and Create PR

```bash
# Push your feature branch
git push origin feature/amazing-new-feature

# Create a Pull Request on GitHub
```

## 📝 Making Changes

### Library Development (Package Branch)

When working on the core library:

1. **Source code** is in `src/`
2. **Main component** is in `src/components/PGPT.tsx`
3. **Supporting components** are in `src/components/`
4. **Utilities** are in `src/utils/`
5. **Main export** is in `src/index.ts`

```bash
# Build the library
pnpm build

# Check TypeScript types
pnpm typecheck

# Check code style
pnpm lint
```

### Demo Website Development (Staging Branch)

When working on the demo website:

1. **Landing page** is in `src/components/LandingPage.tsx`
2. **Demo entry point** is in `src/main.tsx`
3. **Assets** are in `src/assets/` and `public/`

```bash
# Start demo development
pnpm dev

# Build demo site
pnpm build:vite

# Preview demo build
pnpm preview
```

### Code Quality Checks

Always check your code before submitting:

```bash
# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Build to ensure no errors
pnpm build
```

## 🔃 Submitting a Pull Request

### 1. Prepare Your Pull Request

Before submitting:

- [ ] Sync with upstream
- [ ] Test your changes thoroughly
- [ ] Update documentation if needed
- [ ] Ensure TypeScript compiles without errors
- [ ] Follow code style guidelines
- [ ] Build successfully

### 2. Create the Pull Request

1. **Push your branch** to your fork
2. **Navigate** to the original repository
3. **Click** "New Pull Request"
4. **Select** the correct base branch:
   - `package` for library changes
   - `staging` for website/demo changes
5. **Fill out** the PR template

### 3. Pull Request Template

```markdown
## Description
Brief description of your changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] I have tested these changes locally
- [ ] The build completes successfully
- [ ] TypeScript compiles without errors

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] The build completes successfully
```

### 4. Review Process

- **Automated checks** will run (linting, type checking, build)
- **Maintainers** will review your code
- **Address feedback** promptly and professionally
- **Iterate** based on suggestions

## 📏 Code Guidelines

### TypeScript Standards

- Use **TypeScript** for all new code
- Define proper **interfaces** and **types**
- Avoid `any` types when possible
- Use **strict mode** settings

```typescript
// Good
interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

// Avoid
const message: any = { /* ... */ };
```

### React Best Practices

- Use **functional components** with hooks
- Implement **proper prop types** with TypeScript
- Follow **React hooks** best practices
- Use **memo** for performance optimization when needed

```tsx
// Good
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, children }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
```

### Styling Guidelines

- Use **Tailwind CSS** for styling
- Follow **mobile-first** responsive design
- Create **reusable** component classes
- Support both **light** and **dark** themes

```tsx
// Good
const buttonClasses = `
  px-4 py-2 rounded-lg font-medium transition-colors
  ${primary ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
`;
```

### Code Organization

```
src/
├── components/              # React components
│   ├── PGPT.tsx             # Main component
│   ├── LandingPage.tsx      # Demo landing page
│   ├── ChatBubble.tsx       # Message bubble component
│   ├── ChatButton.tsx       # Chat toggle button
│   ├── ChatFooter.tsx       # Chat input area
│   ├── ChatHeader.tsx       # Chat header
│   ├── LoadingAnimation.tsx # Loading animations
│   ├── MarkdownRenderer.tsx # Markdown rendering
│   ├── TypewriterText.tsx   # Typewriter effect
│   └── Toast.tsx            # Toast notifications
├── utils/                   # Utility functions
│   ├── api.ts               # API helpers & LLM integrations
│   ├── common.ts            # Common utilities & theme config
│   └── helpers.ts           # Helper functions
├── assets/                  # Static assets
├── index.ts                 # Main library export
├── index.css                # Global styles
└── main.tsx                 # Demo app entry point
```

## 📚 Documentation

### Code Documentation

- Add **JSDoc comments** for all public APIs
- Include **examples** in documentation
- Document **prop types** thoroughly
- Explain **complex logic** with comments

```typescript
/**
 * PGPT Chat Component
 * 
 * A customizable AI chat interface for React applications.
 * 
 * @example
 * ```tsx
 * <PGPT 
 *   apiKey="your-api-key"
 *   theme="silver"
 *   appearance="dark"
 * />
 * ```
 * 
 * @param props - Component props
 * @param props.apiKey - OpenAI or Gemini API key
 * @param props.theme - UI theme (glass, silver, titanium)
 * @param props.appearance - Appearance mode (light, dark, system)
 */
```

### README Updates

When adding new features:

1. Update the **feature list**
2. Add **usage examples**
3. Update the **props table**
4. Include **screenshots** if visual changes

### Documentation Website

For website documentation changes:

1. Update `src/components/LandingPage.tsx`
2. Ensure **interactive examples** work
3. Update **props tables** with new options
4. Test on **multiple screen sizes**

## 🚀 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0) - Breaking changes
- **MINOR** (0.1.0) - New features (backward compatible)
- **PATCH** (0.0.1) - Bug fixes (backward compatible)

### Release Workflow

1. **Create release branch** from `package`:
   ```bash
   git checkout package
   git pull upstream package
   git checkout -b release/v1.2.0
   ```

2. **Update version** in `package.json`:
   ```bash
   pnpm version minor  # or major/patch
   ```

3. **Update CHANGELOG.md** with release notes

4. **Create PR** to merge release branch into `package`

5. **After merge**, maintainers will:
   - Create and push git tag
   - Publish to NPM
   - Create GitHub release
   - Deploy demo website

### Release Notes Format

```markdown
## [1.4.0] - 2025-07-14

### Added
- New glass theme with glassmorphism effects
- Support for custom positioning
- Markdown rendering for bot responses

### Changed
- Improved theme switching performance
- Updated default button styles

### Fixed
- Dark mode theme inconsistencies
- Mobile responsive layout issues

### Breaking Changes
- Renamed `chatTheme` prop to `theme`
- Removed deprecated `color` prop
```

## 🌍 Community

### Getting Help

- **GitHub Discussions** - Ask questions and share ideas
- **Issues** - Report bugs and request features
- **Email** - Reach out to code.abdulrehman@gmail.com

### Ways to Contribute

Beyond code contributions:

- **Report bugs** with detailed reproduction steps
- **Suggest features** with clear use cases
- **Improve documentation** with examples and clarifications
- **Create tutorials** and blog posts
- **Answer questions** in discussions
- **Share the project** with others who might find it useful

### Recognition

Contributors will be:

- **Listed** in the contributors section
- **Mentioned** in release notes for significant contributions
- **Invited** to join the core team for outstanding contributions
- **Featured** on our website and social media

## 📋 Quick Reference

### Common Commands

```bash
# Setup
git clone https://github.com/YOUR_USERNAME/p-gpt.git
cd p-gpt
pnpm install

# Development
pnpm dev             # Start development server
pnpm build           # Build library
pnpm typecheck       # Check TypeScript types
pnpm lint            # Check code style

# Workflow
git checkout package # Switch to main branch
git pull upstream package # Sync with upstream
git checkout -b feature/my-feature # Create feature branch
git commit -m "feat: add amazing feature" # Commit changes
git push origin feature/my-feature # Push to your fork

# Before submitting PR
pnpm typecheck       # Ensure types are correct
pnpm lint            # Check code style
pnpm build           # Verify build works
```

### Need Help?

If you have questions or need assistance:

1. Check existing **GitHub Issues** and **Discussions**
2. Review the **documentation** and **examples**
3. Create a **new issue** with a clear description
4. Tag it appropriately (`question`, `help wanted`, etc.)

---

Thank you for contributing to P-GPT! Your efforts help make this project better for everyone. 🎉 