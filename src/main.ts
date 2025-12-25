import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { doubleCsrf } from 'csrf-csrf';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { AuthGuard } from 'common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new AuthGuard());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Total-Count'],
    maxAge: 600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  const { doubleCsrfProtection } = doubleCsrf({
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    },
    getSecret: () => process.env.CSRF_SECRET as string,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    getSessionIdentifier: (req: any) => req.sessionID as string,
  });
  app.use(doubleCsrfProtection);

  app.set('trust proxy', 'loopback');
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      originAgentCluster: false,
      permittedCrossDomainPolicies: false,
      referrerPolicy: false,
      strictTransportSecurity: false,
      xContentTypeOptions: false,
      xDownloadOptions: false,
      xFrameOptions: false,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
