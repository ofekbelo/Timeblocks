# Agent 1: Project Setup Agent

**Status:** Ready to Execute  
**Dependencies:** None  
**Estimated Time:** 2-3 hours  
**Working Directory:** `/timeblocks` (root)

---

## 📋 Overview

This agent sets up the complete monorepo foundation for **TimeBlocks** - a time tracking SaaS application for freelancers. You will establish the project structure, configure Turborepo for efficient builds, set up PNPM workspaces, and create all necessary configuration files.

### What You'll Build

- Complete monorepo structure with `apps/` and `packages/`
- Turborepo configuration with optimized pipeline
- PNPM workspace setup
- Shared ESLint and Prettier configurations
- TypeScript base configuration
- Comprehensive documentation structure
- Git repository initialization

---

## 🎯 Context

### Technology Stack

- **Monorepo Tool:** Turborepo 1.12+
- **Package Manager:** PNPM 8+
- **Node Version:** 22.x LTS
- **TypeScript:** 5.3+
- **Frontend:** React 18 + TypeScript + Redux Toolkit + SCSS
- **Backend:** NestJS + Prisma + PostgreSQL
- **Mobile:** React Native + TypeScript

### Why This Stack?

- **Turborepo:** Fast, cached builds; parallel execution; smart dependency management
- **PNPM:** Efficient disk usage, fast installs, strict dependency resolution
- **PostgreSQL:** Robust, feature-rich, excellent JSON support, ACID compliance
- **TypeScript:** Type safety across the entire stack
- **Monorepo:** Share code between web, server, and mobile; unified tooling

---

## 📁 Target Directory Structure

```
timeblocks/
├── apps/
│   ├── web/                        # React frontend (Agent 3)
│   ├── server/                     # NestJS backend (Agent 2)
│   └── mobile/                     # React Native (Agent 7)
├── packages/
│   ├── shared/                     # Shared types, schemas, utils (Agent 4)
│   └── eslint-config/              # Shared ESLint config
├── docs/
│   ├── agents/
│   │   ├── README.md
│   │   └── 01-project-setup/
│   │       └── AGENT.md            # This file
│   ├── architecture/
│   │   └── README.md
│   └── guides/
│       └── README.md
├── .github/
│   └── workflows/                  # CI/CD (Agent 10)
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── .gitignore
├── .prettierrc
├── .prettierignore
├── .nvmrc
├── tsconfig.base.json
└── README.md
```

---

## ✅ Step-by-Step Tasks

### TASK 1: Initialize Root Directory

Create the base project structure:

```bash
mkdir timeblocks
cd timeblocks
pnpm init
```

Create all necessary directories:

```bash
mkdir -p apps/web apps/server apps/mobile
mkdir -p packages/shared packages/eslint-config
mkdir -p docs/agents/01-project-setup docs/architecture docs/guides
mkdir -p .github/workflows
```

**Verification:**

```bash
tree -L 2 -d
```

---

### TASK 2: Root package.json

Create `package.json` in the root directory:

```json
{
  "name": "timeblocks-monorepo",
  "version": "1.0.0",
  "private": true,
  "description": "TimeBlocks - Time tracking SaaS for freelancers and independent workers",
  "author": "Your Name",
  "license": "MIT",
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "test:watch": "turbo run test:watch",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md,mdx,css,scss,html}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md,mdx,css,scss,html}\"",
    "clean": "turbo run clean && rm -rf node_modules",
    "typecheck": "turbo run typecheck"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.5",
    "turbo": "^1.12.4",
    "typescript": "^5.3.3"
  },
  "engines": {
    "node": ">=22.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@8.15.4"
}
```

---

### TASK 3: PNPM Workspace Configuration

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

---

### TASK 4: Turborepo Configuration

Create `turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local", "tsconfig.json", ".eslintrc.js"],
  "globalEnv": [
    "NODE_ENV",
    "DATABASE_URL",
    "JWT_SECRET",
    "JWT_REFRESH_SECRET",
    "RESEND_API_KEY",
    "VITE_API_URL",
    "FRONTEND_URL"
  ],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**", "!build/**/*.map"],
      "env": ["VITE_API_URL", "DATABASE_URL", "NODE_ENV"]
    },
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["^build"]
    },
    "lint": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "inputs": [
        "src/**/*.ts",
        "src/**/*.tsx",
        "test/**/*.ts",
        "test/**/*.tsx",
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "**/*.test.ts",
        "**/*.test.tsx"
      ]
    },
    "test:watch": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    },
    "@timeblocks/shared#build": {
      "outputs": ["dist/**"],
      "dependsOn": []
    },
    "@timeblocks/server#dev": {
      "dependsOn": ["@timeblocks/shared#build"],
      "persistent": true,
      "cache": false
    },
    "@timeblocks/web#dev": {
      "dependsOn": ["@timeblocks/shared#build"],
      "persistent": true,
      "cache": false
    }
  }
}
```

---

### TASK 5: TypeScript Base Configuration

Create `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "exclude": ["node_modules", "dist", "build", ".turbo"]
}
```

---

### TASK 6: Shared ESLint Config Package

Create `packages/eslint-config/package.json`:

```json
{
  "name": "eslint-config-custom",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0"
  }
}
```

Create `packages/eslint-config/index.js`:

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    es2020: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
  },
};
```

---

### TASK 7: Prettier Configuration

Create `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

Create `.prettierignore`:

```
# Dependencies
node_modules
pnpm-lock.yaml

# Build outputs
dist
build
.next
out
coverage

# Turborepo
.turbo

# Misc
*.log
.DS_Store
```

---

### TASK 8: Git Configuration

Create `.gitignore`:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
build/
.next/
out/

# Turborepo
.turbo/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Testing
coverage/
.nyc_output/
*.lcov

# Prisma
prisma/migrations/**/migration.sql

# Misc
*.tsbuildinfo
.eslintcache
.cache
.temp
```

---

### TASK 9: Node Version File

Create `.nvmrc`:

```
22
```

---

### TASK 10: Root README.md

Create `README.md`:

```markdown
# TimeBlocks

> A modern time tracking SaaS application for freelancers and independent workers

[![Node Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)](https://nodejs.org/)
[![PNPM Version](https://img.shields.io/badge/pnpm-%3E%3D8.0.0-orange)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/built%20with-Turborepo-blueviolet)](https://turbo.build/)

## 🚀 Features

- ⏱️ **Real-time Timer** - Start/stop timer with live tracking
- 📊 **Reports & Analytics** - Comprehensive time tracking reports
- 👥 **Client Management** - Organize clients and projects
- 💰 **Revenue Tracking** - Track hourly rates and earnings
- 📱 **Cross-Platform** - Web, iOS, and Android
- 🔐 **Secure Authentication** - JWT-based auth with refresh tokens
- 🌍 **Multi-timezone Support** - Work from anywhere

## 🏗️ Tech Stack

### Frontend (Web)

- **React 18** with TypeScript
- **Redux Toolkit** + RTK Query for state management
- **React Router v7** for routing
- **SCSS Modules** for styling
- **Recharts** for data visualization
- **Vite** for build tooling

### Backend

- **NestJS** with TypeScript
- **Prisma ORM** for database access
- **PostgreSQL 14+** database
- **JWT Authentication** with refresh tokens
- **Resend** for email delivery
- **Swagger/OpenAPI** documentation

### Mobile

- **React Native** with TypeScript
- **React Navigation** for routing
- **Redux Toolkit** for state management

### Infrastructure

- **Turborepo** for monorepo management
- **PNPM** for package management
- **Node.js 22 LTS**
- **GitHub Actions** for CI/CD
- **Vercel** for frontend hosting
- **Railway/Render** for backend hosting

## 📦 Project Structure
```

timeblocks/
├── apps/
│ ├── web/ # React frontend application
│ ├── server/ # NestJS backend API
│ └── mobile/ # React Native mobile app
├── packages/
│ ├── shared/ # Shared types, schemas, and utilities
│ └── eslint-config/# Shared ESLint configuration
└── docs/ # Documentation
├── agents/ # Agent prompts
├── architecture/ # Architecture docs
└── guides/ # Development guides

````

## 🚀 Getting Started

### Prerequisites

- **Node.js 22** or higher ([Download](https://nodejs.org/))
- **PNPM 8** or higher (`npm install -g pnpm`)
- **PostgreSQL 14** or higher ([Download](https://www.postgresql.org/download/))

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd timeblocks
````

2. **Install dependencies:**

```bash
pnpm install
```

3. **Set up environment variables:**

```bash
# Backend
cp apps/server/.env.example apps/server/.env
# Edit apps/server/.env with your database credentials

# Frontend
cp apps/web/.env.example apps/web/.env
# Edit apps/web/.env with your API URL
```

4. **Set up PostgreSQL database:**

```bash
# Create database
createdb timeblocks

# Or using psql
psql -U postgres
CREATE DATABASE timeblocks;
\q

# Run Prisma migrations
pnpm --filter=@timeblocks/server prisma:migrate
```

5. **Start development servers:**

```bash
pnpm dev
```

This will start:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000
- **API Docs:** http://localhost:3000/api/docs

## 📝 Available Scripts

### Development

```bash
pnpm dev                              # Start all apps
pnpm dev --filter=@timeblocks/web     # Start only web
pnpm dev --filter=@timeblocks/server  # Start only server
```

### Building

```bash
pnpm build                            # Build all apps
pnpm build --filter=@timeblocks/web   # Build only web
```

### Testing

```bash
pnpm test                             # Run all tests
pnpm test --filter=@timeblocks/server # Test only server
pnpm test:watch                       # Watch mode
```

### Linting & Formatting

```bash
pnpm lint                             # Lint all code
pnpm format                           # Format all code
pnpm format:check                     # Check formatting
```

### Type Checking

```bash
pnpm typecheck                        # Type check all packages
```

### Cleaning

```bash
pnpm clean                            # Clean all build artifacts
```

## 🗄️ Database Commands

```bash
# Generate Prisma client
pnpm --filter=@timeblocks/server prisma:generate

# Create a migration
pnpm --filter=@timeblocks/server prisma:migrate

# Deploy migrations (production)
pnpm --filter=@timeblocks/server prisma:deploy

# Open Prisma Studio (GUI)
pnpm --filter=@timeblocks/server prisma:studio
```

## 🐘 PostgreSQL Setup

### macOS (Homebrew)

```bash
brew install postgresql@14
brew services start postgresql@14
createdb timeblocks
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb timeblocks
```

### Windows

Download from [postgresql.org](https://www.postgresql.org/download/windows/) and use pgAdmin to create database.

### Docker (All platforms)

```bash
docker run --name timeblocks-postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=timeblocks \
  -p 5432:5432 \
  -d postgres:14
```

### Connection String

```env
DATABASE_URL="postgresql://username:password@localhost:5432/timeblocks"
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter=@timeblocks/server test
pnpm --filter=@timeblocks/web test

# Run with coverage
pnpm --filter=@timeblocks/server test:cov

# Run E2E tests
pnpm --filter=@timeblocks/web test:e2e
```

## 📚 Documentation

- [Architecture Overview](./docs/architecture/system-design.md)
- [API Documentation](http://localhost:3000/api/docs) (when running)
- [Development Guide](./docs/guides/development-workflow.md)
- [Deployment Guide](./docs/guides/deployment-guide.md)
- [Agent Prompts](./docs/agents/README.md)

## 🔧 Turborepo Benefits

- **⚡ Fast Builds** - Intelligent caching speeds up builds by 10x
- **🔄 Parallel Execution** - Run tasks across packages simultaneously
- **📦 Smart Dependencies** - Automatically handles build order
- **🎯 Filtered Runs** - Run commands on specific packages only

## 🤝 Contributing

This is currently a personal project. Contribution guidelines will be added in the future.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

**Built with ❤️ using Turborepo, NestJS, React, and React Native**

````

---

### TASK 11: Documentation Structure

Create `docs/agents/README.md`:

```markdown
# TimeBlocks - Agent Documentation

This directory contains detailed prompts and documentation for each Claude Code agent used in the development of TimeBlocks.

## Agent Overview

The project is built using a multi-agent approach with Claude Code, where each agent is responsible for a specific aspect of the application.

### Main Agents

1. **Agent 1: Project Setup** (✅ Complete)
   - Sets up monorepo structure
   - Configures Turborepo
   - Establishes development environment

2. **Agent 2: Backend Foundation**
   - NestJS setup
   - Database schema with Prisma
   - Authentication system
   - API modules

3. **Agent 3: Frontend Foundation**
   - React setup
   - Redux Toolkit + RTK Query
   - Router and layouts
   - UI component library

4. **Agent 4: Shared Package**
   - TypeScript types
   - Zod validation schemas
   - Shared utilities

5. **Agent 5: Features Integration**
   - Timer functionality
   - Projects and clients
   - Reports and analytics

6. **Agent 6: Email Service**
   - Email templates
   - Resend integration
   - Notification system

7. **Agent 7: Mobile App**
   - React Native setup
   - Mobile navigation
   - Mobile-specific features

8. **Agent 8: Testing**
   - API testing
   - Unit testing
   - Integration testing
   - E2E testing

9. **Agent 9: Documentation**
   - API documentation
   - User guides
   - Architecture docs

10. **Agent 10: Deployment**
    - CI/CD setup
    - Deployment configuration
    - Monitoring

## Using These Agents

Each agent has a dedicated markdown file with:
- Full context and background
- Step-by-step tasks
- Code examples
- Success criteria
- Checklist

Simply copy the content of the agent's markdown file and paste it into Claude Code to execute that phase of development.
````

Create `docs/architecture/README.md`:

```markdown
# Architecture Documentation

This directory will contain detailed architecture documentation including:

- System design overview
- Database schema diagrams (PostgreSQL)
- API specifications
- Authentication flows
- State management patterns

Documentation will be added by subsequent agents.
```

Create `docs/guides/README.md`:

```markdown
# Development Guides

This directory will contain development guides including:

- Getting started guide
- Development workflow
- Coding standards
- Git workflow
- PostgreSQL management
- Troubleshooting guide
- Deployment guide

Guides will be added by subsequent agents.
```

---

### TASK 12: Create Placeholder Files

Create `apps/web/.gitkeep`:

```
# Placeholder for web application
# Will be set up by Agent 3: Frontend Foundation
```

Create `apps/server/.gitkeep`:

```
# Placeholder for server application
# Will be set up by Agent 2: Backend Foundation
# Database: PostgreSQL 14+
```

Create `apps/mobile/.gitkeep`:

```
# Placeholder for mobile application
# Will be set up by Agent 7: Mobile App
```

Create `packages/shared/.gitkeep`:

```
# Placeholder for shared package
# Will be set up by Agent 4: Shared Package
```

---

### TASK 13: Install Dependencies

Execute the following commands:

```bash
# Install root dependencies
pnpm install

# Install eslint-config dependencies
cd packages/eslint-config
pnpm install

# Return to root
cd ../..
```

---

### TASK 14: Verify Setup

Run these verification commands:

```bash
# 1. Check Node version
node --version
# Expected: v22.x.x

# 2. Check PNPM version
pnpm --version
# Expected: 8.x.x

# 3. Check Turbo installation
turbo --version
# Expected: 1.x.x

# 4. List workspace packages
pnpm list --depth 0

# 5. Test Turbo pipeline
turbo run build --dry-run

# 6. Test format command
pnpm format:check

# 7. Verify directory structure
tree -L 3 -I 'node_modules'
```

---

### TASK 15: Initialize Git Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "chore: initial project setup with Turborepo and PNPM

- Set up monorepo structure with apps/ and packages/
- Configure Turborepo with optimized pipeline
- Add PNPM workspace configuration
- Set up shared ESLint and Prettier configs
- Create TypeScript base configuration
- Add comprehensive README and documentation structure
- Configure for PostgreSQL database
- Add Node version file (.nvmrc)

This establishes the foundation for the TimeBlocks project.

Agent: Project Setup Agent (Agent 1)"
```

---

## ✅ Success Criteria

Before marking this agent as COMPLETE, verify:

### Files Created

- [ ] `package.json` (root)
- [ ] `pnpm-workspace.yaml`
- [ ] `turbo.json`
- [ ] `tsconfig.base.json`
- [ ] `.gitignore`
- [ ] `.prettierrc`
- [ ] `.prettierignore`
- [ ] `.nvmrc`
- [ ] `README.md` (root) - with PostgreSQL instructions
- [ ] `packages/eslint-config/package.json`
- [ ] `packages/eslint-config/index.js`
- [ ] Documentation structure

### Verification

- [ ] `pnpm install` completes successfully
- [ ] `turbo --version` shows version
- [ ] All verification commands pass
- [ ] Git repository initialized
- [ ] PostgreSQL mentioned in documentation

---

## 📊 Output Summary

After completion:

- ✅ Monorepo structure created
- ✅ Turborepo configured
- ✅ PNPM workspace ready
- ✅ Documentation structure in place
- ✅ Configured for PostgreSQL
- ✅ Ready for Agent 2

---

**Agent 1 Complete! Ready for Backend Development with PostgreSQL 🐘🚀**
