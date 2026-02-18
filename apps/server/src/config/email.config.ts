import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  resendApiKey: process.env.RESEND_API_KEY,
  from: process.env.RESEND_FROM || 'TimeBlocks <onboarding@resend.dev>',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
}));
