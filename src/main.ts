import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config();

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('XFlix API')
      .setDescription('XFLix API')
      .build(),
  );

  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
