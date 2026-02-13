import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get('JWT_SECRET'),
  signOptions: {
    expiresIn: '15m', // Access token expires in 15 minutes
  },
});

export const jwtRefreshConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get('JWT_REFRESH_SECRET'),
  signOptions: {
    expiresIn: '7d', // Refresh token expires in 7 days
  },
});
