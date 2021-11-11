<<<<<<< HEAD
import * as express from 'express';
import { config } from './config';
import { connectDb } from './db';
import * as cors from 'cors';
import { controllers, loggerMiddleware } from './common';
import { initStrategy } from './auth';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.all('/api/v1/*', loggerMiddleware);
app.use('/api/v1', controllers);

(function (port: number): void {
  initStrategy();

  app.listen(port, () => {
    connectDb();
    console.log(`server is running at port ${port}`);
  });
})(config.port);
=======
import { NestFactory } from '@nestjs/core';
import { AppModule as V1Module } from './v1/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
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
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get<number>('port'));
}
bootstrap();
>>>>>>> origin/with-nestjs
