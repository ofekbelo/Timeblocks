import { randomBytes, createHash } from 'crypto';

export class TokensUtil {
  /**
   * Generate a random token
   */
  static generateToken(length: number = 32): string {
    return randomBytes(length).toString('hex');
  }

  /**
   * Hash a token for secure storage
   */
  static hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  /**
   * Generate token with expiration
   */
  static generateTokenWithExpiry(hours: number = 24): {
    token: string;
    hashedToken: string;
    expiresAt: Date;
  } {
    const token = this.generateToken();
    const hashedToken = this.hashToken(token);
    const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000);

    return { token, hashedToken, expiresAt };
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(expiresAt: Date): boolean {
    return new Date() > expiresAt;
  }
}
