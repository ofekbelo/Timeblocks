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
