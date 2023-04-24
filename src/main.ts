import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });
  const port = Number(process.env.PORT) || 4000; // Cloud Run の要件。環境変数PORTで起動するようにする。
  await app.listen(
    port,
    (process.env.NOTE_ENV = 'dev' ? '127.0.0.1' : '0.0.0.0'),
  ); // '0.0.0.0' を追加して外部からのアクセスを受け入れる。
}
bootstrap();
