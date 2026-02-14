# Agent 3: Frontend Foundation

**Status:** Ready to Execute  
**Dependencies:** Agent 1 (Project Setup), Agent 2 (Backend - optional for testing)  
**Estimated Time:** 7-10 hours (1 full day)  
**Working Directory:** `timeblocks/apps/web/`

---

## 📋 Overview

This agent sets up the complete React frontend for TimeBlocks, including:
- React 18 with TypeScript and Vite
- Redux Toolkit + RTK Query for state management
- React Router v7 for routing
- SCSS Modules for styling
- Custom UI component library
- Complete authentication flow
- Protected routes and layouts

### Architecture

```
Frontend Stack:
├── React 18 (UI Library)
├── TypeScript (Type Safety)
├── Vite (Build Tool)
├── Redux Toolkit (State Management)
├── RTK Query (API Client)
├── React Router v7 (Routing)
├── SCSS Modules (Styling)
├── React Hook Form + Zod (Forms)
├── Recharts (Charts - later)
└── Built-in Intl API (i18n)
```

---

## 🎯 What You'll Build

### Pages & Routes
```
Public Routes:
/auth/login          - Login page
/auth/register       - Registration page
/auth/forgot-password - Password reset request
/auth/reset-password  - Password reset form

Protected Routes:
/                    - Dashboard
/timer               - Timer page
/projects            - Projects list
/projects/:id        - Project detail
/clients             - Clients list
/clients/:id         - Client detail
/time-entries        - Time entries list
/reports             - Reports & analytics
/settings            - User settings
/profile             - User profile
```

### Redux Store Structure
```typescript
store/
├── index.ts                 // Store configuration
├── hooks.ts                 // Typed hooks
├── api/
│   ├── baseApi.ts          // Base API with auth
│   ├── authApi.ts          // Auth endpoints
│   ├── clientsApi.ts       // Clients CRUD
│   ├── projectsApi.ts      // Projects CRUD
│   ├── timeEntriesApi.ts   // Time entries CRUD
│   └── reportsApi.ts       // Reports endpoints
└── slices/
    ├── authSlice.ts        // Auth state
    ├── uiSlice.ts          // UI state (modals, etc.)
    └── timerSlice.ts       // Active timer state
```

---

## 🏗️ Sub-Agents Breakdown

### **Sub-Agent 3.1: Redux Setup** (2-3 hours)
**File:** `3.1-redux-setup.md`

**What it does:**
- Initialize Vite + React + TypeScript project
- Install all dependencies
- Setup Redux Toolkit store
- Create RTK Query API slices
- Configure base API with token refresh
- Create auth slice

**Output:**
- Working React app
- Redux store configured
- API integration ready
- Auth state management

---

### **Sub-Agent 3.2: Router & Layout** (2-3 hours)
**File:** `3.2-router-layout.md`

**What it does:**
- Setup React Router v7
- Create layouts (Root, Auth)
- Build Sidebar component
- Build Header component
- Protected routes with auth guard
- Navigation structure

**Output:**
- Complete routing system
- Responsive layouts
- Navigation components
- Auth flow working

---

### **Sub-Agent 3.3: UI Components** (3-4 hours)
**File:** `3.3-ui-components.md`

**What it does:**
- Create SCSS design system
- Build custom UI components (Button, Input, Card, Modal, etc.)
- Create form components
- Setup global styles
- Create utility components

**Output:**
- Design system (colors, spacing, etc.)
- 15+ reusable UI components
- Form components with validation
- Professional UI foundation

---

## 📊 Expected Final Structure

```
apps/web/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── public/
│   └── vite.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── vite-env.d.ts
│   ├── store/
│   │   ├── index.ts
│   │   ├── hooks.ts
│   │   ├── api/
│   │   │   ├── baseApi.ts
│   │   │   ├── authApi.ts
│   │   │   ├── clientsApi.ts
│   │   │   ├── projectsApi.ts
│   │   │   ├── timeEntriesApi.ts
│   │   │   └── reportsApi.ts
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── uiSlice.ts
│   │       └── timerSlice.ts
│   ├── router/
│   │   └── index.tsx
│   ├── layouts/
│   │   ├── RootLayout/
│   │   │   ├── RootLayout.tsx
│   │   │   ├── RootLayout.module.scss
│   │   │   ├── Sidebar/
│   │   │   └── Header/
│   │   └── AuthLayout/
│   │       ├── AuthLayout.tsx
│   │       └── AuthLayout.module.scss
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── Dashboard/
│   │   ├── Timer/
│   │   ├── Projects/
│   │   ├── Clients/
│   │   └── Settings/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Table/
│   │   │   ├── Select/
│   │   │   └── Spinner/
│   │   ├── forms/
│   │   │   ├── FormField/
│   │   │   └── FormError/
│   │   └── common/
│   │       ├── Logo/
│   │       ├── Avatar/
│   │       └── ProtectedRoute/
│   ├── styles/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _reset.scss
│   │   └── global.scss
│   ├── utils/
│   │   ├── intl.ts
│   │   ├── validation.ts
│   │   └── storage.ts
│   └── types/
│       └── index.ts
└── .env.example
```

---

## 🚀 How to Execute

### Step 1: Read This File (AGENT.md)
Understand the overall structure.

### Step 2: Execute Sub-Agents in Order

**Execute Sub-Agent 3.1 first:**
```bash
# Open Claude Code
claude

# Copy and paste content of 3.1-redux-setup.md
```

**Then execute Sub-Agent 3.2:**
```bash
# Copy and paste content of 3.2-router-layout.md
```

**Finally execute Sub-Agent 3.3:**
```bash
# Copy and paste content of 3.3-ui-components.md
```

### Step 3: Start Development Server

```bash
cd apps/web
pnpm dev

# Opens at http://localhost:5173
```

---

## ✅ Success Criteria

After completing all 3 sub-agents:

### App Running
- [ ] `pnpm dev` starts without errors
- [ ] App opens at http://localhost:5173
- [ ] No console errors
- [ ] Hot reload works

### Redux
- [ ] Redux DevTools shows store
- [ ] API slices configured
- [ ] Auth slice working
- [ ] Can dispatch actions

### Routing
- [ ] All routes accessible
- [ ] Protected routes redirect to login
- [ ] Navigation works
- [ ] Layouts render correctly

### UI
- [ ] Design system applied
- [ ] Components render correctly
- [ ] Responsive on mobile/desktop
- [ ] SCSS modules working

### Integration
- [ ] Can register new user
- [ ] Can login and receive token
- [ ] Token stored in Redux
- [ ] Protected routes work with token
- [ ] Logout works

---

## 🔧 Prerequisites

Before starting:

### 1. Agent 1 Complete
- Monorepo structure exists
- PNPM workspace configured

### 2. Agent 2 Complete (Optional)
- Backend running on http://localhost:3000
- Can test API integration
- If not ready, you can mock the API

### 3. Node & PNPM
- Node 22+
- PNPM 8+

---

## 📝 Environment Variables

Create `apps/web/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Create `apps/web/.env.example`:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 📚 Key Technologies

### React Router v7
- Latest version with new features
- Data loading APIs
- Better TypeScript support

### Redux Toolkit
- Modern Redux with less boilerplate
- Includes Immer for immutability
- Redux DevTools built-in

### RTK Query
- Powerful data fetching
- Automatic caching
- Optimistic updates
- Tag invalidation

### SCSS Modules
- CSS Modules + SCSS power
- Scoped styles
- No naming conflicts
- Variables and mixins

---

## 🎨 Design System Preview

```scss
// Colors
$color-primary: #4A90E2;
$color-success: #7ED321;
$color-warning: #F5A623;
$color-danger: #D0021B;

// Spacing
$spacing-xs: 0.25rem;  // 4px
$spacing-sm: 0.5rem;   // 8px
$spacing-md: 1rem;     // 16px
$spacing-lg: 1.5rem;   // 24px
$spacing-xl: 2rem;     // 32px

// Typography
$font-family: 'Inter', system-ui, sans-serif;
$font-size-sm: 0.875rem;
$font-size-base: 1rem;
$font-size-lg: 1.125rem;
```

---

## 🐛 Troubleshooting

### Port 5173 Already in Use
```bash
# Change port in vite.config.ts
server: {
  port: 5174
}
```

### Module Not Found
```bash
cd apps/web
rm -rf node_modules
pnpm install
```

### TypeScript Errors
```bash
# Re-generate types
pnpm typecheck
```

### SCSS Not Working
```bash
# Make sure sass is installed
pnpm add -D sass
```

---

## ➡️ Next Steps

After Agent 3 completes:

1. ✅ Test all pages and routes
2. ✅ Verify Redux state in DevTools
3. ✅ Check responsive design
4. ✅ Test API integration (if backend ready)
5. ✅ Commit your work
6. 🚀 Ready for **Agent 4: Shared Package**
7. Then **Agent 5: Features Integration**

---

## 💡 Tips

### Redux DevTools
Install browser extension:
- Chrome: Redux DevTools
- Firefox: Redux DevTools

### VS Code Extensions
Recommended:
- ESLint
- SCSS IntelliSense
- TypeScript + JavaScript

### Development Workflow
```bash
# Terminal 1: Backend
cd apps/server
pnpm dev

# Terminal 2: Frontend
cd apps/web
pnpm dev
```

---

**Let's build a beautiful frontend! 🎨**