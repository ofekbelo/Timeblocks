import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3001',
      configService.get('FRONTEND_URL'),
    ].filter(Boolean),
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Global validation pipe (disabled whitelist/forbidNonWhitelisted since we use Zod)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('TimeBlocks API')
    .setDescription('Time tracking SaaS API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);

  console.log(`
    🚀 Server running on: http://localhost:${port}
    📚 API Documentation: http://localhost:${port}/api/docs
    🗄️  Database: Connected to PostgreSQL
  `);
}

bootstrap();
