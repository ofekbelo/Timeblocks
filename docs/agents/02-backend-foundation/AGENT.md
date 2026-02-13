# Agent 2: Backend Foundation

**Status:** Ready to Execute  
**Dependencies:** Agent 1 (Project Setup)  
**Estimated Time:** 7-10 hours (1 full day)  
**Working Directory:** `timeblocks/apps/server/`

---

## 📋 Overview

This agent sets up the complete NestJS backend for TimeBlocks, including:

- PostgreSQL database with Prisma ORM
- JWT authentication system with refresh tokens
- Complete REST API with CRUD operations
- Email verification flow
- Swagger API documentation

### Architecture

```
Backend Stack:
├── NestJS 10+ (Framework)
├── Prisma 5+ (ORM)
├── PostgreSQL 14+ (Database)
├── JWT (Authentication)
├── bcrypt (Password hashing)
├── Zod (Validation)
├── Resend (Email service)
└── Swagger (API docs)
```

---

## 🎯 What You'll Build

### Database Models (Prisma)

- Users
- Clients
- Projects
- Time Entries
- Refresh Tokens

### API Endpoints

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/verify-email/:token

Users:
GET    /api/users/me
PATCH  /api/users/me
PATCH  /api/users/me/password

Clients:
GET    /api/clients
POST   /api/clients
GET    /api/clients/:id
PATCH  /api/clients/:id
DELETE /api/clients/:id

Projects:
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
GET    /api/projects/:id/stats

Time Entries:
GET    /api/time-entries
POST   /api/time-entries
GET    /api/time-entries/:id
PATCH  /api/time-entries/:id
DELETE /api/time-entries/:id
POST   /api/time-entries/start-timer
POST   /api/time-entries/stop-timer
GET    /api/time-entries/active-timer

Reports:
GET    /api/reports/summary
GET    /api/reports/by-project
GET    /api/reports/daily
GET    /api/reports/export
```

---

## 🏗️ Sub-Agents Breakdown

This agent is divided into 3 sub-agents for better organization:

### **Sub-Agent 2.1: Database & Prisma Setup** (2-3 hours)

**File:** `2.1-database-prisma.md`

**What it does:**

- Initialize NestJS project
- Setup Prisma with PostgreSQL
- Create database schema (all models)
- Generate migrations
- Create Prisma service

**Output:**

- Working NestJS app structure
- Prisma configured and ready
- Database schema defined
- Initial migration created

---

### **Sub-Agent 2.2: Authentication System** (2-3 hours)

**File:** `2.2-authentication.md`

**What it does:**

- JWT authentication with access/refresh tokens
- Password hashing with bcrypt
- Email verification flow
- Password reset flow
- Auth guards and strategies

**Output:**

- Complete auth module
- JWT strategy working
- Register/Login/Refresh endpoints
- Password reset functionality

---

### **Sub-Agent 2.3: API Modules** (3-4 hours)

**File:** `2.3-api-modules.md`

**What it does:**

- Clients CRUD module
- Projects CRUD module
- Time Entries CRUD module
- Reports module
- Swagger/OpenAPI documentation
- Validation with Zod

**Output:**

- All CRUD endpoints working
- Swagger docs available
- DTOs with validation
- Authorization guards applied

---

## 📊 Expected Final Structure

```
apps/server/
├── package.json
├── nest-cli.json
├── tsconfig.json
├── .env
├── .env.example
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   │   └── 20240213_init/
│   │       └── migration.sql
│   └── seed.ts
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   └── email.config.ts
│   ├── common/
│   │   ├── decorators/
│   │   │   └── current-user.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts
│   │   └── pipes/
│   │       └── zod-validation.pipe.ts
│   ├── prisma/
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   └── modules/
│       ├── auth/
│       │   ├── auth.module.ts
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   ├── dto/
│       │   │   ├── register.dto.ts
│       │   │   ├── login.dto.ts
│       │   │   └── refresh-token.dto.ts
│       │   ├── strategies/
│       │   │   ├── jwt.strategy.ts
│       │   │   └── jwt-refresh.strategy.ts
│       │   └── guards/
│       │       ├── jwt-auth.guard.ts
│       │       └── jwt-refresh.guard.ts
│       ├── users/
│       │   ├── users.module.ts
│       │   ├── users.controller.ts
│       │   ├── users.service.ts
│       │   └── dto/
│       ├── clients/
│       │   ├── clients.module.ts
│       │   ├── clients.controller.ts
│       │   ├── clients.service.ts
│       │   └── dto/
│       ├── projects/
│       │   ├── projects.module.ts
│       │   ├── projects.controller.ts
│       │   ├── projects.service.ts
│       │   └── dto/
│       ├── time-entries/
│       │   ├── time-entries.module.ts
│       │   ├── time-entries.controller.ts
│       │   ├── time-entries.service.ts
│       │   └── dto/
│       ├── reports/
│       │   ├── reports.module.ts
│       │   ├── reports.controller.ts
│       │   └── reports.service.ts
│       └── email/
│           ├── email.module.ts
│           ├── email.service.ts
│           └── templates/
└── test/
    └── (to be added by Agent 8)
```

---

## 🚀 How to Execute

### Step 1: Read This File (AGENT.md)

Understand the overall structure and what each sub-agent does.

### Step 2: Execute Sub-Agents in Order

**Execute Sub-Agent 2.1 first:**

```bash
# Open Claude Code
claude

# Copy and paste content of 2.1-database-prisma.md
# Wait for completion
```

**Then execute Sub-Agent 2.2:**

```bash
# Copy and paste content of 2.2-authentication.md
# Wait for completion
```

**Finally execute Sub-Agent 2.3:**

```bash
# Copy and paste content of 2.3-api-modules.md
# Wait for completion
```

### Step 3: Verify Everything Works

After all sub-agents complete:

```bash
# Start PostgreSQL (if not running)
# macOS
brew services start postgresql@14

# Start the server
cd apps/server
pnpm dev

# Test API
curl http://localhost:3000/api/health

# Check Swagger docs
open http://localhost:3000/api/docs
```

---

## ✅ Success Criteria

After completing all 3 sub-agents:

### Backend Running

- [ ] `pnpm dev` starts without errors
- [ ] Server runs on http://localhost:3000
- [ ] Swagger docs available at http://localhost:3000/api/docs

### Database

- [ ] PostgreSQL database created
- [ ] Prisma migrations applied
- [ ] Prisma Studio opens (`pnpm prisma:studio`)
- [ ] Can create tables successfully

### Authentication

- [ ] Can register new user
- [ ] Can login and receive JWT
- [ ] Can refresh token
- [ ] Protected routes require JWT
- [ ] Password hashing works

### API Endpoints

- [ ] All CRUD endpoints respond
- [ ] Validation works (try invalid data)
- [ ] Authorization works (try without token)
- [ ] Swagger docs show all endpoints

### Code Quality

- [ ] No TypeScript errors
- [ ] ESLint passes
- [ ] All DTOs have Zod validation
- [ ] Error handling implemented

---

## 🔧 Prerequisites

Before starting, ensure:

### 1. Agent 1 Complete

- Monorepo structure exists
- PNPM workspace configured
- Turborepo set up

### 2. PostgreSQL Installed

```bash
# macOS
brew install postgresql@14
brew services start postgresql@14

# Create database
createdb timeblocks

# Or using Docker
docker run --name timeblocks-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=timeblocks \
  -p 5432:5432 \
  -d postgres:14
```

### 3. Environment Variables Ready

You'll need:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Random secret for JWT
- `JWT_REFRESH_SECRET` - Different secret for refresh tokens
- `RESEND_API_KEY` - From resend.com (can add later)

---

## 📝 Notes

### Database Choice: PostgreSQL

We're using PostgreSQL because:

- ✅ Better JSON support
- ✅ Full-text search built-in
- ✅ Array types for tags
- ✅ More robust for complex queries
- ✅ Excellent Prisma support

### Authentication Strategy

- Access tokens: 15 minutes (short-lived)
- Refresh tokens: 7 days (stored in DB)
- Refresh tokens rotate on use
- Logout invalidates refresh token

### API Design

- RESTful endpoints
- Consistent error responses
- Pagination for list endpoints
- Filtering and sorting support

---

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Find process
lsof -ti:3000

# Kill it
kill -9 <PID>
```

### PostgreSQL Connection Failed

```bash
# Check if running
pg_isready

# Check credentials in .env
cat apps/server/.env
```

### Prisma Client Not Generated

```bash
cd apps/server
pnpm prisma generate
```

### Module Not Found Errors

```bash
# Re-install dependencies
cd apps/server
rm -rf node_modules
pnpm install
```

---

## ➡️ Next Steps

After Agent 2 completes successfully:

1. ✅ Test all endpoints with Postman/Thunder Client
2. ✅ Verify database tables in Prisma Studio
3. ✅ Check Swagger documentation
4. ✅ Commit your work
5. 🚀 Ready for **Agent 3: Frontend Foundation**

---

**Let's build a solid backend! 💪**
