import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Quitan todos los campos extra que no esten definidos en el DTO
    forbidNonWhitelisted: true, // Evita que se hagan peticiones con campos extra retorna 404
  }))


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
