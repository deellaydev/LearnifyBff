import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://learnifyclient.onrender.com', // Замените на ваш фронтенд домен
    credentials: true, // Разрешить отправку куки
  });
  app.use(cookieParser());
  await app.listen(PORT ?? 3000);
}
bootstrap().then(() => {
  console.log(`Server is started at port ${PORT}`);
});
