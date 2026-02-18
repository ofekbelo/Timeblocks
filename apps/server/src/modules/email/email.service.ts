import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import type {
  SendEmailOptions,
  VerificationEmailData,
  PasswordResetEmailData,
  WelcomeEmailData,
} from './types/email.types';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend | null;
  private readonly from: string;
  private readonly frontendUrl: string;
  private readonly baseTemplate: HandlebarsTemplateDelegate;
  private readonly isConfigured: boolean;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('email.resendApiKey');
    this.isConfigured = !!apiKey;

    if (!this.isConfigured) {
      this.logger.warn('Resend API key not configured. Emails will not be sent.');
      this.resend = null;
    } else {
      this.resend = new Resend(apiKey);
    }

    this.from = this.configService.get<string>('email.from')!;
    this.frontendUrl = this.configService.get<string>('email.frontendUrl')!;

    // Load base template
    const baseTemplatePath = path.join(__dirname, 'templates', 'layouts', 'base.hbs');
    const baseTemplateSource = fs.readFileSync(baseTemplatePath, 'utf-8');
    this.baseTemplate = handlebars.compile(baseTemplateSource);
  }

  private loadTemplate(templateName: string): HandlebarsTemplateDelegate {
    const templatePath = path.join(__dirname, 'templates', `${templateName}.hbs`);
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    return handlebars.compile(templateSource);
  }

  private renderTemplate(
    templateName: string,
    subject: string,
    data: Record<string, any>,
  ): string {
    const template = this.loadTemplate(templateName);
    const body = template({ ...data, frontendUrl: this.frontendUrl });

    return this.baseTemplate({
      subject,
      body,
      year: new Date().getFullYear(),
      frontendUrl: this.frontendUrl,
    });
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    if (!this.isConfigured || !this.resend) {
      this.logger.warn(`Email not sent (API key not configured): ${options.subject} to ${options.to}`);
      return;
    }

    try {
      const { to, subject, html, text } = options;

      this.logger.log(`Sending email to ${to}: ${subject}`);

      const result = await this.resend.emails.send({
        from: this.from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text,
      });

      this.logger.log(`Email sent successfully: ${result.data?.id}`);
    } catch (error) {
      this.logger.error('Failed to send email:', error);
      // Don't throw - email failure shouldn't break the app
    }
  }

  async sendVerificationEmail(
    to: string,
    data: VerificationEmailData,
  ): Promise<void> {
    const subject = 'Verify your email address';
    const html = this.renderTemplate('verification', subject, data);

    await this.sendEmail({ to, subject, html });
  }

  async sendPasswordResetEmail(
    to: string,
    data: PasswordResetEmailData,
  ): Promise<void> {
    const subject = 'Reset your password';
    const html = this.renderTemplate('password-reset', subject, data);

    await this.sendEmail({ to, subject, html });
  }

  async sendWelcomeEmail(to: string, data: WelcomeEmailData): Promise<void> {
    const subject = 'Welcome to TimeBlocks!';
    const html = this.renderTemplate('welcome', subject, data);

    await this.sendEmail({ to, subject, html });
  }

  // Test method for development
  async sendTestEmail(to: string): Promise<void> {
    await this.sendEmail({
      to,
      subject: 'Test Email from TimeBlocks',
      html: '<h1>Hello from TimeBlocks!</h1><p>This is a test email.</p>',
    });
  }
}
