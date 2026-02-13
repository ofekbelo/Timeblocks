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
│   ├── web/          # React frontend application
│   ├── server/       # NestJS backend API
│   └── mobile/       # React Native mobile app
├── packages/
│   ├── shared/       # Shared types, schemas, and utilities
│   └── eslint-config/# Shared ESLint configuration
└── docs/             # Documentation
    ├── agents/       # Agent prompts
    ├── architecture/ # Architecture docs
    └── guides/       # Development guides
```

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
```

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

**Ofek Belo**

- GitHub: [@ofekbelo](https://github.com/ofekbelo)
- Email: ofek.belo@example.com

---

**Built with ❤️ using Turborepo, NestJS, React, and React Native**
