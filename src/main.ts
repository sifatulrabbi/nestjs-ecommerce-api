import { NestFactory } from '@nestjs/core';
import { AppModule as V1Module } from './v1/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(V1Module);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({ stopAtFirstError: true, always: true }),
  );
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('exp-api')
    .setDescription('exp api description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get<number>('port'));
  console.log(`App is running on url: ${await app.getUrl()}`);
}
bootstrap();
