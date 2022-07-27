import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Users & Wallets Documentation')
    .setDescription('A test to show users and their wallets!.')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .addTag('wallet')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
