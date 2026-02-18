export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
}

export interface EmailTemplate {
  name: string;
  subject: string;
  data: Record<string, any>;
}

export interface VerificationEmailData {
  fullName: string;
  verificationLink: string;
}

export interface PasswordResetEmailData {
  fullName: string;
  resetLink: string;
}

export interface WelcomeEmailData {
  fullName: string;
  loginLink: string;
}
