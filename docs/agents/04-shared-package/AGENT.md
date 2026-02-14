# Agent 4: Shared Package

**Status:** Ready to Execute  
**Dependencies:** Agent 1 (Project Setup), Agent 2 (Backend), Agent 3 (Frontend)  
**Estimated Time:** 2-3 hours  
**Working Directory:** `timeblocks/packages/shared/`

---

## 📋 Overview

This agent creates a shared TypeScript package containing types, validation schemas, constants, and utilities that are used by both the backend (NestJS) and frontend (React). 

**IMPORTANT:** This agent also updates all existing backend and frontend code to use the shared package, removing duplicated code and ensuring type safety across the entire application.

### Why Shared Package?

**Benefits:**
- ✅ **Single Source of Truth** - Types defined once, used everywhere
- ✅ **Type Safety** - Frontend and backend stay in sync
- ✅ **Reduced Duplication** - Don't repeat type definitions
- ✅ **Easier Refactoring** - Change types in one place
- ✅ **Shared Validation** - Same Zod schemas on both sides

---

## 🎯 What You'll Build

### 1. Shared Package
- Types (User, Client, Project, TimeEntry)
- API Request/Response types
- Enums (ProjectStatus, etc.)

### 2. Zod Schemas
- Validation schemas for all DTOs
- Shared between frontend forms and backend validation

### 3. Constants
- Project status values
- Default colors
- Common configurations

### 4. Utilities
- Date formatting helpers
- Validation helpers
- Type guards

### 5. **Backend Integration** (NEW!)
- Update all DTOs to import from shared package
- Update all services to use shared types
- Remove duplicated type definitions
- Ensure validation consistency

### 6. **Frontend Integration** (NEW!)
- Update all API slices to use shared types
- Update auth forms to use shared schemas
- Add react-hook-form with Zod resolver
- Remove duplicated type definitions
- Enable client-side validation

**Result:** One source of truth, perfect type safety, consistent validation! ✨

---

## ✅ Step-by-Step Tasks

### TASK 1: Initialize Package

```bash
cd packages/shared
pnpm init
```

---

### TASK 2: Create package.json

Create `packages/shared/package.json`:

```json
{
  "name": "@timeblocks/shared",
  "version": "1.0.0",
  "description": "Shared types, schemas, and utilities for TimeBlocks",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "./types": {
      "types": "./dist/types/index.d.ts",
      "default": "./dist/types/index.js"
    },
    "./schemas": {
      "types": "./dist/schemas/index.d.ts",
      "default": "./dist/schemas/index.js"
    },
    "./constants": {
      "types": "./dist/constants/index.d.ts",
      "default": "./dist/constants/index.js"
    },
    "./utils": {
      "types": "./dist/utils/index.d.ts",
      "default": "./dist/utils/index.js"
    }
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist node_modules .turbo",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

---

### TASK 3: Configure TypeScript

Create `packages/shared/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

### TASK 4: Create Directory Structure

```bash
cd packages/shared
mkdir -p src/{types,schemas,constants,utils}
```

---

### TASK 5: Create User Types

Create `src/types/user.types.ts`:

```typescript
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  timezone: string;
  currency: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  preferences?: Record<string, any>;
}

export type UserWithoutPassword = Omit<User, 'passwordHash'>;
```

---

### TASK 6: Create Client Types

Create `src/types/client.types.ts`:

```typescript
export interface Client {
  id: string;
  userId: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  color: string;
  notes?: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientWithProjects extends Client {
  projects?: Project[];
}

export interface CreateClientDto {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  color?: string;
  notes?: string;
}

export type UpdateClientDto = Partial<CreateClientDto>;

// Forward declaration (will be defined in project.types.ts)
interface Project {
  id: string;
  name: string;
}
```

---

### TASK 7: Create Project Types

Create `src/types/project.types.ts`:

```typescript
export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export interface Project {
  id: string;
  userId: string;
  clientId?: string;
  name: string;
  hourlyRate?: number;
  estimatedBudget?: number;
  startDate?: string;
  endDate?: string;
  status: ProjectStatus;
  color: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWithClient extends Project {
  client?: {
    id: string;
    name: string;
  };
}

export interface ProjectStats {
  totalHours: number;
  totalRevenue: number;
  totalEntries: number;
}

export interface ProjectWithStats extends Project {
  stats: ProjectStats;
}

export interface CreateProjectDto {
  name: string;
  clientId?: string;
  hourlyRate?: number;
  estimatedBudget?: number;
  startDate?: string;
  endDate?: string;
  color?: string;
  status?: ProjectStatus;
}

export type UpdateProjectDto = Partial<CreateProjectDto>;
```

---

### TASK 8: Create Time Entry Types

Create `src/types/time-entry.types.ts`:

```typescript
export interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  description?: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in seconds
  isManual: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TimeEntryWithProject extends TimeEntry {
  project: {
    id: string;
    name: string;
    color: string;
    client?: {
      id: string;
      name: string;
    };
  };
}

export interface CreateTimeEntryDto {
  projectId: string;
  description?: string;
  startTime: string;
  endTime?: string;
  tags?: string[];
}

export type UpdateTimeEntryDto = Partial<CreateTimeEntryDto>;

export interface StartTimerDto {
  projectId: string;
  description?: string;
}

export interface ActiveTimer extends TimeEntry {
  elapsedSeconds: number;
}
```

---

### TASK 9: Create Auth Types

Create `src/types/auth.types.ts`:

```typescript
import { User } from './user.types';

export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}
```

---

### TASK 10: Create Types Index

Create `src/types/index.ts`:

```typescript
export * from './user.types';
export * from './client.types';
export * from './project.types';
export * from './time-entry.types';
export * from './auth.types';
```

---

### TASK 11: Create Auth Schemas

Create `src/schemas/auth.schemas.ts`:

```typescript
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
```

---

### TASK 12: Create Client Schemas

Create `src/schemas/client.schemas.ts`:

```typescript
import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().max(50, 'Phone is too long').optional().or(z.literal('')),
  address: z.string().max(500, 'Address is too long').optional().or(z.literal('')),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format')
    .optional(),
  notes: z.string().max(1000, 'Notes are too long').optional().or(z.literal('')),
});

export const updateClientSchema = createClientSchema.partial();

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
```

---

### TASK 13: Create Project Schemas

Create `src/schemas/project.schemas.ts`:

```typescript
import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  clientId: z.string().optional(),
  hourlyRate: z.number().positive('Hourly rate must be positive').optional(),
  estimatedBudget: z.number().positive('Budget must be positive').optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format')
    .optional(),
  status: z.enum(['ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED']).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
```

---

### TASK 14: Create Time Entry Schemas

Create `src/schemas/time-entry.schemas.ts`:

```typescript
import { z } from 'zod';

export const createTimeEntrySchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  description: z.string().max(500, 'Description is too long').optional(),
  startTime: z.string().datetime('Invalid start time'),
  endTime: z.string().datetime('Invalid end time').optional(),
  tags: z.array(z.string()).optional(),
});

export const updateTimeEntrySchema = createTimeEntrySchema.partial();

export const startTimerSchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  description: z.string().max(500, 'Description is too long').optional(),
});

export type CreateTimeEntryInput = z.infer<typeof createTimeEntrySchema>;
export type UpdateTimeEntryInput = z.infer<typeof updateTimeEntrySchema>;
export type StartTimerInput = z.infer<typeof startTimerSchema>;
```

---

### TASK 15: Create Schemas Index

Create `src/schemas/index.ts`:

```typescript
export * from './auth.schemas';
export * from './client.schemas';
export * from './project.schemas';
export * from './time-entry.schemas';
```

---

### TASK 16: Create Status Constants

Create `src/constants/status.constants.ts`:

```typescript
import { ProjectStatus } from '../types';

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  [ProjectStatus.ACTIVE]: 'Active',
  [ProjectStatus.ON_HOLD]: 'On Hold',
  [ProjectStatus.COMPLETED]: 'Completed',
  [ProjectStatus.ARCHIVED]: 'Archived',
};

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  [ProjectStatus.ACTIVE]: '#7ED321',
  [ProjectStatus.ON_HOLD]: '#F5A623',
  [ProjectStatus.COMPLETED]: '#4A90E2',
  [ProjectStatus.ARCHIVED]: '#9CA3AF',
};

export const DEFAULT_PROJECT_STATUS = ProjectStatus.ACTIVE;
```

---

### TASK 17: Create Color Constants

Create `src/constants/colors.constants.ts`:

```typescript
export const DEFAULT_COLORS = [
  '#4A90E2', // Blue
  '#7ED321', // Green
  '#F5A623', // Orange
  '#D0021B', // Red
  '#BD10E0', // Purple
  '#F8E71C', // Yellow
  '#50E3C2', // Teal
  '#B8E986', // Light Green
  '#9013FE', // Violet
  '#417505', // Dark Green
  '#E94B3C', // Coral
  '#0E5A8A', // Navy
];

export const getRandomColor = (): string => {
  return DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)];
};
```

---

### TASK 18: Create Constants Index

Create `src/constants/index.ts`:

```typescript
export * from './status.constants';
export * from './colors.constants';
```

---

### TASK 19: Create Date Utilities

Create `src/utils/date.utils.ts`:

```typescript
/**
 * Format duration in seconds to human-readable string
 * @param seconds - Duration in seconds
 * @returns Formatted string (e.g., "2h 30m")
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

/**
 * Parse ISO datetime string to Date object
 * @param dateString - ISO datetime string
 * @returns Date object
 */
export function parseDate(dateString: string): Date {
  return new Date(dateString);
}

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns true if date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is this week
 * @param date - Date to check
 * @returns true if date is this week
 */
export function isThisWeek(date: Date): boolean {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  return date >= weekStart && date < weekEnd;
}

/**
 * Get start of day
 * @param date - Date
 * @returns Start of day
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get end of day
 * @param date - Date
 * @returns End of day
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Calculate elapsed time in seconds between two dates
 * @param start - Start date
 * @param end - End date (defaults to now)
 * @returns Elapsed seconds
 */
export function getElapsedSeconds(start: Date, end: Date = new Date()): number {
  return Math.floor((end.getTime() - start.getTime()) / 1000);
}
```

---

### TASK 20: Create Validation Utilities

Create `src/utils/validation.utils.ts`:

```typescript
import { ZodSchema } from 'zod';

/**
 * Validate data against a Zod schema
 * @param schema - Zod schema
 * @param data - Data to validate
 * @returns Validation result
 */
export function validate<T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.errors.map((err) => err.message);
  return { success: false, errors };
}

/**
 * Check if a string is a valid email
 * @param email - Email to validate
 * @returns true if valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if a string is a valid hex color
 * @param color - Color to validate
 * @returns true if valid hex color
 */
export function isValidHexColor(color: string): boolean {
  const hexRegex = /^#[0-9A-F]{6}$/i;
  return hexRegex.test(color);
}
```

---

### TASK 21: Create Utilities Index

Create `src/utils/index.ts`:

```typescript
export * from './date.utils';
export * from './validation.utils';
```

---

### TASK 22: Create Main Index

Create `src/index.ts`:

```typescript
// Types
export * from './types';

// Schemas
export * from './schemas';

// Constants
export * from './constants';

// Utils
export * from './utils';
```

---

### TASK 23: Install Dependencies

```bash
cd packages/shared
pnpm install
```

---

### TASK 24: Build the Package

```bash
cd packages/shared
pnpm build
```

**Expected output:**
- `dist/` directory created
- `.js` and `.d.ts` files generated
- No TypeScript errors

---

### TASK 25: Test Imports in Backend

Update `apps/server/src/modules/clients/dto/create-client.dto.ts`:

```typescript
// Before (duplicated schema)
import { z } from 'zod';
export const createClientSchema = z.object({
  // ... duplicated definition
});

// After (using shared schema)
import { createClientSchema, CreateClientInput } from '@timeblocks/shared/schemas';

export { createClientSchema };
export type CreateClientDto = CreateClientInput;
```

---

### TASK 26: Test Imports in Frontend

Update `apps/web/src/store/api/clientsApi.ts`:

```typescript
// Before (duplicated types)
export interface Client {
  id: string;
  // ...
}

// After (using shared types)
import type { Client, CreateClientDto } from '@timeblocks/shared/types';

export type { Client, CreateClientDto };
```

---

### TASK 27: Update package.json References

**Backend** - Add to `apps/server/package.json`:

```json
{
  "dependencies": {
    "@timeblocks/shared": "workspace:*"
  }
}
```

**Frontend** - Add to `apps/web/package.json`:

```json
{
  "dependencies": {
    "@timeblocks/shared": "workspace:*"
  }
}
```

---

### TASK 28: Reinstall Dependencies

```bash
# From root
pnpm install
```

---

### TASK 29: Update Backend - Auth Module

Now let's update the backend to use the shared package!

**Update `apps/server/src/modules/auth/dto/register.dto.ts`:**

```typescript
import { registerSchema, RegisterInput } from '@timeblocks/shared/schemas';

export { registerSchema };
export type RegisterDto = RegisterInput;
```

**Update `apps/server/src/modules/auth/dto/login.dto.ts`:**

```typescript
import { loginSchema, LoginInput } from '@timeblocks/shared/schemas';

export { loginSchema };
export type LoginDto = LoginInput;
```

**Update `apps/server/src/modules/auth/dto/refresh-token.dto.ts`:**

```typescript
import { z } from 'zod';

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;
```

**Update `apps/server/src/modules/auth/dto/forgot-password.dto.ts`:**

```typescript
import { forgotPasswordSchema, ForgotPasswordInput } from '@timeblocks/shared/schemas';

export { forgotPasswordSchema };
export type ForgotPasswordDto = ForgotPasswordInput;
```

**Update `apps/server/src/modules/auth/dto/reset-password.dto.ts`:**

```typescript
import { resetPasswordSchema, ResetPasswordInput } from '@timeblocks/shared/schemas';

export { resetPasswordSchema };
export type ResetPasswordDto = ResetPasswordInput;
```

**Update `apps/server/src/modules/auth/auth.service.ts`:**

```typescript
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { RegisterInput, LoginInput } from '@timeblocks/shared/schemas';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterInput) {
    // ... rest of the code stays the same
  }

  async login(dto: LoginInput) {
    // ... rest of the code stays the same
  }

  // ... rest of the service
}
```

---

### TASK 30: Update Backend - Clients Module

**Update `apps/server/src/modules/clients/dto/create-client.dto.ts`:**

```typescript
import { createClientSchema, CreateClientInput } from '@timeblocks/shared/schemas';

export { createClientSchema };
export type CreateClientDto = CreateClientInput;
```

**Update `apps/server/src/modules/clients/dto/update-client.dto.ts`:**

```typescript
import { updateClientSchema, UpdateClientInput } from '@timeblocks/shared/schemas';

export { updateClientSchema };
export type UpdateClientDto = UpdateClientInput;
```

**Update `apps/server/src/modules/clients/clients.service.ts`:**

```typescript
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateClientInput, UpdateClientInput } from '@timeblocks/shared/schemas';
import type { Client } from '@timeblocks/shared/types';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string): Promise<Client[]> {
    return this.prisma.client.findMany({
      where: { userId, isArchived: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        projects: {
          where: { isArchived: false },
        },
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (client.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return client;
  }

  async create(userId: string, dto: CreateClientInput): Promise<Client> {
    return this.prisma.client.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateClientInput): Promise<Client> {
    await this.findOne(id, userId);

    return this.prisma.client.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, userId: string): Promise<Client> {
    await this.findOne(id, userId);

    return this.prisma.client.update({
      where: { id },
      data: { isArchived: true },
    });
  }
}
```

---

### TASK 31: Update Backend - Projects Module

**Update `apps/server/src/modules/projects/dto/create-project.dto.ts`:**

```typescript
import { createProjectSchema, CreateProjectInput } from '@timeblocks/shared/schemas';

export { createProjectSchema };
export type CreateProjectDto = CreateProjectInput;
```

**Update `apps/server/src/modules/projects/dto/update-project.dto.ts`:**

```typescript
import { updateProjectSchema, UpdateProjectInput } from '@timeblocks/shared/schemas';

export { updateProjectSchema };
export type UpdateProjectDto = UpdateProjectInput;
```

**Update `apps/server/src/modules/projects/projects.service.ts`:**

```typescript
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProjectInput, UpdateProjectInput } from '@timeblocks/shared/schemas';
import type { Project, ProjectWithStats } from '@timeblocks/shared/types';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { userId, isArchived: false },
      include: {
        client: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
        timeEntries: {
          take: 10,
          orderBy: { startTime: 'desc' },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return project;
  }

  async create(userId: string, dto: CreateProjectInput): Promise<Project> {
    return this.prisma.project.create({
      data: {
        ...dto,
        userId,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
      include: {
        client: true,
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateProjectInput): Promise<Project> {
    await this.findOne(id, userId);

    return this.prisma.project.update({
      where: { id },
      data: {
        ...dto,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
      include: {
        client: true,
      },
    });
  }

  async remove(id: string, userId: string): Promise<Project> {
    await this.findOne(id, userId);

    return this.prisma.project.update({
      where: { id },
      data: { isArchived: true },
    });
  }

  async getStats(id: string, userId: string): Promise<ProjectWithStats> {
    const project = await this.findOne(id, userId);

    const timeEntries = await this.prisma.timeEntry.findMany({
      where: { projectId: id },
    });

    const totalSeconds = timeEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
    const totalHours = totalSeconds / 3600;
    const totalRevenue = project.hourlyRate ? totalHours * Number(project.hourlyRate) : 0;

    return {
      ...project,
      stats: {
        totalHours,
        totalRevenue,
        totalEntries: timeEntries.length,
      },
    };
  }
}
```

---

### TASK 32: Update Frontend - API Types

**Update `apps/web/src/store/api/authApi.ts`:**

```typescript
import { baseApi } from './baseApi';
import type { User, AuthResponse, RegisterDto, LoginDto } from '@timeblocks/shared/types';

export type { User, AuthResponse, RegisterDto, LoginDto };

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterDto>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation<AuthResponse, LoginDto>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<{ message: string }, { refreshToken: string }>({
      query: (body) => ({
        url: '/auth/logout',
        method: 'POST',
        body,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi;
```

**Update `apps/web/src/store/api/clientsApi.ts`:**

```typescript
import { baseApi } from './baseApi';
import type { Client, CreateClientDto, UpdateClientDto } from '@timeblocks/shared/types';

export type { Client, CreateClientDto, UpdateClientDto };

export const clientsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => '/clients',
      providesTags: ['Client'],
    }),
    getClient: builder.query<Client, string>({
      query: (id) => `/clients/${id}`,
      providesTags: (result, error, id) => [{ type: 'Client', id }],
    }),
    createClient: builder.mutation<Client, CreateClientDto>({
      query: (body) => ({
        url: '/clients',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Client'],
    }),
    updateClient: builder.mutation<Client, { id: string; data: UpdateClientDto }>({
      query: ({ id, data }) => ({
        url: `/clients/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Client', id }],
    }),
    deleteClient: builder.mutation<void, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Client'],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi;
```

**Update `apps/web/src/store/api/projectsApi.ts`:**

```typescript
import { baseApi } from './baseApi';
import type { 
  Project, 
  ProjectWithStats,
  CreateProjectDto, 
  UpdateProjectDto 
} from '@timeblocks/shared/types';

export type { Project, ProjectWithStats, CreateProjectDto, UpdateProjectDto };

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => '/projects',
      providesTags: ['Project'],
    }),
    getProject: builder.query<Project, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation<Project, CreateProjectDto>({
      query: (body) => ({
        url: '/projects',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<Project, { id: string; data: UpdateProjectDto }>({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
    getProjectStats: builder.query<ProjectWithStats, string>({
      query: (id) => `/projects/${id}/stats`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectStatsQuery,
} = projectsApi;
```

**Update `apps/web/src/store/api/timeEntriesApi.ts`:**

```typescript
import { baseApi } from './baseApi';
import type {
  TimeEntry,
  TimeEntryWithProject,
  CreateTimeEntryDto,
  UpdateTimeEntryDto,
  StartTimerDto,
  ActiveTimer,
} from '@timeblocks/shared/types';

export type {
  TimeEntry,
  TimeEntryWithProject,
  CreateTimeEntryDto,
  UpdateTimeEntryDto,
  StartTimerDto,
  ActiveTimer,
};

export const timeEntriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTimeEntries: builder.query<TimeEntry[], void>({
      query: () => '/time-entries',
      providesTags: ['TimeEntry'],
    }),
    getTimeEntry: builder.query<TimeEntry, string>({
      query: (id) => `/time-entries/${id}`,
      providesTags: (result, error, id) => [{ type: 'TimeEntry', id }],
    }),
    createTimeEntry: builder.mutation<TimeEntry, CreateTimeEntryDto>({
      query: (body) => ({
        url: '/time-entries',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TimeEntry'],
    }),
    updateTimeEntry: builder.mutation<TimeEntry, { id: string; data: UpdateTimeEntryDto }>({
      query: ({ id, data }) => ({
        url: `/time-entries/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'TimeEntry', id }],
    }),
    deleteTimeEntry: builder.mutation<void, string>({
      query: (id) => ({
        url: `/time-entries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TimeEntry'],
    }),
    startTimer: builder.mutation<TimeEntry, StartTimerDto>({
      query: (body) => ({
        url: '/time-entries/start-timer',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TimeEntry'],
    }),
    stopTimer: builder.mutation<TimeEntry, void>({
      query: () => ({
        url: '/time-entries/stop-timer',
        method: 'POST',
      }),
      invalidatesTags: ['TimeEntry'],
    }),
    getActiveTimer: builder.query<ActiveTimer | null, void>({
      query: () => '/time-entries/active-timer',
      providesTags: ['TimeEntry'],
    }),
  }),
});

export const {
  useGetTimeEntriesQuery,
  useGetTimeEntryQuery,
  useCreateTimeEntryMutation,
  useUpdateTimeEntryMutation,
  useDeleteTimeEntryMutation,
  useStartTimerMutation,
  useStopTimerMutation,
  useGetActiveTimerQuery,
} = timeEntriesApi;
```

---

### TASK 33: Update Frontend - Auth Slice

**Update `apps/web/src/store/slices/authSlice.ts`:**

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@timeblocks/shared/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setCredentials, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
```

---

### TASK 34: Update Frontend - Use Schemas in Forms

**Update `apps/web/src/pages/auth/Login.tsx` to use shared schema:**

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@timeblocks/shared/schemas';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import styles from './Auth.module.scss';

export function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setError('');

    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate('/');
    } catch (err: any) {
      setError(err?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Login to TimeBlocks</h1>
        <p className={styles.subtitle}>Track your time, manage your projects</p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              autoFocus
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <button type="submit" disabled={isLoading} className={styles.submitBtn}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <p className={styles.link}>
            Don't have an account? <a href="/auth/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
```

**Update `apps/web/src/pages/auth/Register.tsx` similarly:**

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@timeblocks/shared/schemas';
import { useRegisterMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import styles from './Auth.module.scss';

export function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState('');

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setError('');

    try {
      const result = await register(data).unwrap();
      dispatch(setCredentials(result));
      navigate('/');
    } catch (err: any) {
      setError(err?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Create Account</h1>
        <p className={styles.subtitle}>Start tracking your time today</p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              {...registerField('fullName')}
              autoFocus
            />
            {errors.fullName && (
              <span className={styles.error}>{errors.fullName.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...registerField('email')}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...registerField('password')}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
            <small>At least 8 characters with uppercase, lowercase, and number</small>
          </div>

          <button type="submit" disabled={isLoading} className={styles.submitBtn}>
            {isLoading ? 'Creating account...' : 'Register'}
          </button>

          <p className={styles.link}>
            Already have an account? <a href="/auth/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
```

---

### TASK 35: Add react-hook-form to Frontend

```bash
cd apps/web
pnpm add react-hook-form @hookform/resolvers
```

---

### TASK 36: Restart All Services

After all updates:

```bash
# Stop all running dev servers (Ctrl+C in each terminal)

# From root, reinstall to ensure dependencies are linked
pnpm install

# Start Backend
cd apps/server
pnpm dev

# Start Frontend (in another terminal)
cd apps/web
pnpm dev
```

---

## ✅ Verification

### 1. Check Package Built Successfully

```bash
cd packages/shared
ls -la dist/

# Should see:
# - index.js, index.d.ts
# - types/, schemas/, constants/, utils/ directories
```

### 2. Test Backend Integration

```bash
cd apps/server
pnpm dev
```

**Verify:**
- [ ] No import errors
- [ ] Server starts successfully
- [ ] Can register a user (using shared schema validation)
- [ ] Can login (using shared schema validation)

**Test with curl:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!",
    "fullName": "Test User"
  }'
```

### 3. Test Frontend Integration

```bash
cd apps/web
pnpm dev
```

**Verify:**
- [ ] No import errors
- [ ] App starts successfully
- [ ] Can see login page
- [ ] Form validation works (try invalid email)
- [ ] Can register new user
- [ ] Can login

### 4. Test Type Safety

Open `apps/web/src/store/api/clientsApi.ts` in VS Code:

- Hover over `Client` type - should show definition from @timeblocks/shared
- Try to use wrong property - TypeScript should error
- Auto-completion should work

### 5. Test Shared Validation

**Frontend form validation:**
1. Go to Register page
2. Try password without uppercase → Should show error
3. Try short password → Should show error
4. Try invalid email → Should show error

**Backend validation:**
```bash
# Try invalid data
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "not-an-email",
    "password": "short",
    "fullName": "T"
  }'

# Should get validation errors from backend
```

Both should reject with **same validation rules**! ✅

---

## ✅ Success Criteria

### Package Creation
- [ ] Shared package built without errors
- [ ] `dist/` directory contains compiled files
- [ ] All types exported correctly
- [ ] All schemas exported correctly
- [ ] Constants and utils available

### Backend Integration
- [ ] Backend imports from `@timeblocks/shared` successfully
- [ ] All DTOs updated to use shared schemas
- [ ] All services use shared types
- [ ] No duplicated type definitions in backend
- [ ] Server starts without errors
- [ ] Can register/login with validation working

### Frontend Integration
- [ ] Frontend imports from `@timeblocks/shared` successfully
- [ ] All API slices use shared types
- [ ] Auth forms use shared schemas with react-hook-form
- [ ] No duplicated type definitions in frontend
- [ ] App starts without errors
- [ ] Form validation works on client side

### Type Safety
- [ ] TypeScript recognizes shared types
- [ ] Auto-completion works in VS Code
- [ ] Type errors show correctly
- [ ] No circular dependencies

### Validation Consistency
- [ ] Same validation rules in frontend and backend
- [ ] Frontend rejects invalid data before sending
- [ ] Backend rejects invalid data if frontend bypassed
- [ ] Error messages consistent

---

## 📊 What We Built

```
✅ Shared Package (@timeblocks/shared)
   - TypeScript Types (User, Client, Project, TimeEntry, Auth)
   - Zod Schemas (all validation in one place)
   - Constants (statuses, colors)
   - Utilities (date formatting, validation)

✅ Backend Integration
   - Updated all DTOs to use shared schemas
   - Updated all services to use shared types
   - Removed duplicated code
   - Consistent validation with frontend

✅ Frontend Integration
   - Updated all API slices to use shared types
   - Updated auth forms to use shared schemas
   - Added react-hook-form with zodResolver
   - Removed duplicated code
   - Client-side validation matches backend

✅ Type Safety Everywhere
   - Single source of truth for types
   - Auto-completion in VS Code
   - Compile-time type checking
   - No runtime type mismatches

✅ Consistent Validation
   - Same Zod schemas on both sides
   - Frontend validates before sending
   - Backend validates as safety net
   - Same error messages everywhere
```

### Files Modified/Created:

**Created:**
- `packages/shared/` (entire package)
  - 5 type files
  - 4 schema files
  - 2 constants files
  - 2 utility files

**Updated - Backend (14 files):**
- `apps/server/src/modules/auth/dto/*.ts` (5 files)
- `apps/server/src/modules/auth/auth.service.ts`
- `apps/server/src/modules/clients/dto/*.ts` (2 files)
- `apps/server/src/modules/clients/clients.service.ts`
- `apps/server/src/modules/projects/dto/*.ts` (2 files)
- `apps/server/src/modules/projects/projects.service.ts`
- `apps/server/package.json`

**Updated - Frontend (9 files):**
- `apps/web/src/store/api/*.ts` (4 files)
- `apps/web/src/store/slices/authSlice.ts`
- `apps/web/src/pages/auth/Login.tsx`
- `apps/web/src/pages/auth/Register.tsx`
- `apps/web/package.json`

**Total:** 1 package created + 23 files updated

---

## 🔧 Usage Examples

### Backend (NestJS)

```typescript
// In a DTO
import { createClientSchema, CreateClientInput } from '@timeblocks/shared/schemas';

export class CreateClientDto implements CreateClientInput {
  // TypeScript will ensure this matches
}

// In a service
import { Client } from '@timeblocks/shared/types';

async findAll(): Promise<Client[]> {
  return this.prisma.client.findMany();
}
```

### Frontend (React)

```typescript
// In a component
import { Project, ProjectStatus } from '@timeblocks/shared/types';
import { formatDuration } from '@timeblocks/shared/utils';

function ProjectCard({ project }: { project: Project }) {
  return (
    <div>
      <h3>{project.name}</h3>
      <span>{project.status}</span>
    </div>
  );
}

// In a form
import { createProjectSchema } from '@timeblocks/shared/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

const { register, handleSubmit } = useForm({
  resolver: zodResolver(createProjectSchema),
});
```

---

## ➡️ Next Steps

Shared package complete! Now you can:

1. ✅ Update backend to use shared types/schemas
2. ✅ Update frontend to use shared types/schemas
3. ✅ Remove duplicated code
4. 🚀 Ready for **Agent 5: Features Integration**

---

## 💡 Tips

### Adding New Types

1. Add type to `src/types/[entity].types.ts`
2. Export from `src/types/index.ts`
3. Rebuild: `pnpm build`
4. Use in backend/frontend: `import { MyType } from '@timeblocks/shared/types'`

### Adding New Schemas

1. Add schema to `src/schemas/[entity].schemas.ts`
2. Export from `src/schemas/index.ts`
3. Rebuild: `pnpm build`
4. Use: `import { mySchema } from '@timeblocks/shared/schemas'`

### Development Workflow

```bash
# Terminal 1: Watch shared package
cd packages/shared
pnpm dev

# Terminal 2: Backend
cd apps/server
pnpm dev

# Terminal 3: Frontend
cd apps/web
pnpm dev
```

---

**Shared package complete! 📦 Single source of truth achieved! ✨**