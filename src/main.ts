import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });
  const port = Number(process.env.PORT) || 4000; // Cloud Run の要件。環境変数PORTで起動するようにする。
  await app.listen(port, '0.0.0.0'); // '0.0.0.0' を追加して外部からのアクセスを受け入れる。
}
bootstrap();
