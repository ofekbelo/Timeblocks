import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './modules/email/email.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
  ) {}

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  // Development only - remove in production
  @Get('test-email')
  async testEmail(@Query('to') to: string) {
    if (!to) {
      return { error: 'Please provide "to" query parameter' };
    }

    await this.emailService.sendTestEmail(to);
    return { message: `Test email sent to ${to}` };
  }
}
