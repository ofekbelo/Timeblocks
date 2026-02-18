# Agent 6: Email Service

**Status:** Ready to Execute  
**Dependencies:** Agent 1-2 (Setup, Backend)  
**Estimated Time:** 3-5 hours  
**Working Directory:** `timeblocks/apps/server/`

---

## 📋 Overview

This agent adds professional email functionality to TimeBlocks, including user verification, password reset, and automated notifications.

### Why Email Service?

**Essential Features:**
- ✅ **Email Verification** - Ensure valid email addresses
- ✅ **Password Reset** - Secure password recovery
- ✅ **Welcome Emails** - Great first impression
- ✅ **Notifications** - Keep users engaged (optional)

**Professional Touch:**
- Beautiful, branded email templates
- Reliable delivery with Resend
- Secure token generation
- Error handling and logging

---

## 🎯 What You'll Build

### Email Infrastructure (Sub-Agent 6.1)

```
✅ Resend Integration
   - API setup
   - Configuration
   - Error handling
   
✅ Email Service Module
   - Send email function
   - Template rendering
   - Logging
   
✅ Email Templates
   - Handlebars templates
   - Base layout
   - Beautiful styling
   
✅ Testing
   - Test emails
   - Preview templates
```

### Email Features (Sub-Agent 6.2)

```
✅ Email Verification
   - Generate verification token
   - Send verification email
   - Verify endpoint
   - Resend verification
   
✅ Password Reset
   - Request reset
   - Generate reset token
   - Send reset email
   - Reset password endpoint
   - Token expiration
   
✅ Welcome Email
   - Send on registration
   - Personalized greeting
   - Getting started tips
   
✅ Frontend Pages
   - Email verification page
   - Password reset request
   - Password reset form
   - Success messages
```

---

## 🏗️ Sub-Agents Breakdown

### **Sub-Agent 6.1: Email Setup** (1-2 hours)
**File:** `6.1-email-setup.md`

**What it does:**
- Install and configure Resend
- Create email service module
- Build email templates with Handlebars
- Create base email layout
- Add test utilities

**Output:**
- Working email service
- Beautiful email templates
- Ability to send emails
- Testing tools

---

### **Sub-Agent 6.2: Email Features** (2-3 hours)
**File:** `6.2-email-features.md`

**What it does:**
- Implement email verification flow
- Implement password reset flow
- Add welcome email
- Create frontend pages
- Integrate with auth flow

**Output:**
- Complete verification system
- Complete password reset
- Welcome emails working
- Frontend pages ready
- Secure token handling

---

## 📊 Expected Final Structure

```
apps/server/src/
├── modules/
│   ├── email/
│   │   ├── email.module.ts
│   │   ├── email.service.ts
│   │   ├── templates/
│   │   │   ├── layouts/
│   │   │   │   └── base.hbs
│   │   │   ├── verification.hbs
│   │   │   ├── password-reset.hbs
│   │   │   ├── welcome.hbs
│   │   │   └── weekly-summary.hbs
│   │   └── types/
│   │       └── email.types.ts
│   └── auth/
│       ├── auth.controller.ts (updated)
│       ├── auth.service.ts (updated)
│       └── dto/
│           ├── verify-email.dto.ts
│           ├── forgot-password.dto.ts
│           └── reset-password.dto.ts
├── config/
│   └── email.config.ts
└── utils/
    └── tokens.util.ts

apps/web/src/
└── pages/
    └── auth/
        ├── VerifyEmail.tsx
        ├── ForgotPassword.tsx
        ├── ResetPassword.tsx
        └── Auth.module.scss (updated)
```

---

## 🚀 How to Execute

### Step 1: Get Resend API Key

1. Go to https://resend.com
2. Sign up for free account
3. Verify your domain (or use resend.dev for testing)
4. Create API key
5. Copy the key

### Step 2: Execute Sub-Agents in Order

**Execute Sub-Agent 6.1 first:**
```bash
# Open Claude Code
claude

# Copy and paste content of 6.1-email-setup.md
# When prompted, provide your Resend API key
```

**Then execute Sub-Agent 6.2:**
```bash
# Copy and paste content of 6.2-email-features.md
```

### Step 3: Test Email Flows

After all sub-agents complete:

```bash
# Start backend
cd apps/server
pnpm dev

# Start frontend
cd apps/web
pnpm dev
```

**Test flows:**
1. Register new user → Check email inbox
2. Click verification link → Account verified
3. Try "Forgot Password" → Check email
4. Click reset link → Reset password
5. Login with new password → Success

---

## ✅ Success Criteria

After completing both sub-agents:

### Email Service Works
- [ ] Resend configured correctly
- [ ] Can send test email
- [ ] Templates render properly
- [ ] No errors in logs

### Verification Works
- [ ] User receives verification email
- [ ] Email contains working link
- [ ] Link verifies account
- [ ] Can resend verification
- [ ] Expired tokens rejected

### Password Reset Works
- [ ] User can request reset
- [ ] Receives reset email
- [ ] Email contains working link
- [ ] Can set new password
- [ ] Old password no longer works
- [ ] Token expires after use/time

### Frontend Integration
- [ ] Verification page displays
- [ ] Reset password form works
- [ ] Success messages show
- [ ] Error handling works
- [ ] Responsive design

### Security
- [ ] Tokens are random and secure
- [ ] Tokens expire appropriately
- [ ] Passwords hashed properly
- [ ] No sensitive data in emails
- [ ] Rate limiting works

---

## 🔧 Prerequisites

Before starting:

### 1. Agent 2 Complete
- Backend running with authentication
- Database configured
- Auth module working

### 2. Resend Account
- Free account at resend.com
- API key ready
- (Optional) Domain verified

### 3. Email for Testing
- Real email address you can access
- Check spam folder if needed

---

## 📚 Key Technologies

### Resend
- **Modern email API** - No SMTP hassles
- **Free tier** - 100 emails/day, 3,000/month
- **Great DX** - Simple API, good docs
- **Reliable** - High delivery rates

### Handlebars
- **Template engine** - Dynamic email content
- **Simple syntax** - Easy to learn
- **Powerful** - Conditionals, loops, helpers
- **Popular** - Well documented

### Crypto
- **Token generation** - Secure random tokens
- **Built-in** - No extra dependencies
- **Fast** - Native Node.js module

---

## 🎨 Email Templates Preview

### Verification Email
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⏰ TimeBlocks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hi {{fullName}}!

Welcome to TimeBlocks! Please verify 
your email address to get started.

[Verify Email Address]

This link expires in 24 hours.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Password Reset Email
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⏰ TimeBlocks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hi {{fullName}},

Someone requested a password reset 
for your account. If this was you,
click below:

[Reset Password]

This link expires in 1 hour.

If you didn't request this, ignore
this email. Your password won't change.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 💡 Tips

### Development Workflow

**Testing Emails:**
```bash
# Option 1: Use your real email
RESEND_API_KEY=re_xxx pnpm dev

# Option 2: Use Resend test mode
# Emails sent to @resend.dev domains work in test mode
```

**Debugging:**
```typescript
// Add logging to email service
console.log('Sending email:', { to, subject, template });

// Check Resend dashboard for delivery status
// https://resend.com/emails
```

### Common Patterns

**Token Generation:**
```typescript
import { randomBytes } from 'crypto';

const token = randomBytes(32).toString('hex');
const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
```

**Template Rendering:**
```typescript
const template = handlebars.compile(templateSource);
const html = template({ fullName, verificationLink });
```

**Error Handling:**
```typescript
try {
  await emailService.send({ to, subject, html });
} catch (error) {
  console.error('Failed to send email:', error);
  // Don't throw - email failure shouldn't block registration
}
```

---

## 🐛 Troubleshooting

### Emails Not Arriving

**Check spam folder:**
- Emails might be filtered
- Mark as "Not Spam"

**Check Resend dashboard:**
- See delivery status
- Check for errors
- View email logs

**Verify API key:**
- Check .env file
- Ensure key is correct
- Not expired

### "Domain not verified"

**Option 1: Use test domain**
```env
# Can send to any @resend.dev address
RESEND_FROM=onboarding@resend.dev
```

**Option 2: Verify your domain**
- Add DNS records in Resend
- Wait for verification
- Use your domain

### Template Not Rendering

**Check file paths:**
```typescript
// Make sure path is correct
const templatePath = path.join(__dirname, 'templates', 'verification.hbs');
```

**Check Handlebars syntax:**
```handlebars
<!-- Use double braces -->
{{fullName}}

<!-- Not single braces -->
{fullName} ❌
```

### Tokens Not Working

**Check expiration:**
```typescript
// Make sure token hasn't expired
if (verificationToken.expiresAt < new Date()) {
  throw new BadRequestException('Token expired');
}
```

**Check token in database:**
- Verify token was saved
- Check it matches request
- Ensure not already used

---

## ➡️ Next Steps

After Agent 6 completes:

1. ✅ Test all email flows
2. ✅ Send test emails to yourself
3. ✅ Verify email templates look good
4. ✅ Test on mobile email clients
5. ✅ Commit your work
6. 🚀 **Agent 7: Mobile App** (React Native)
7. 🚀 **Agent 8: Testing** (Unit, Integration, E2E)

---

## 🔒 Security Considerations

### Token Security
```typescript
// ✅ Good: Crypto random
const token = crypto.randomBytes(32).toString('hex');

// ❌ Bad: Predictable
const token = Date.now().toString();
```

### Token Storage
```typescript
// ✅ Good: Hash tokens in database
const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
await db.save({ token: hashedToken });

// ❌ Bad: Store plain tokens
await db.save({ token }); // If DB leaked, tokens exposed
```

### Token Expiration
```typescript
// ✅ Good: Short expiration
const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

// ❌ Bad: Long expiration
const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
```

### Email Content
```typescript
// ✅ Good: No sensitive data
{ subject: 'Password Reset Request' }

// ❌ Bad: Sensitive data
{ subject: `Your password is: ${password}` }
```

---

## 📈 Future Enhancements

After Agent 6, you can add:

**Email Preferences:**
- Let users opt out of marketing emails
- Choose notification frequency
- Unsubscribe links

**More Email Types:**
- Invoice emails
- Report exports
- Team invitations
- Activity summaries

**Advanced Features:**
- Email tracking (opens, clicks)
- A/B testing
- Personalization
- Segmentation

**Alternative Providers:**
- SendGrid
- Mailgun
- Amazon SES
- Postmark

---

**Let's add professional email service! 📧**