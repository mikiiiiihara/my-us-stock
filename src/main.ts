import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger.service';
import * as cookieParser from 'cookie-parser';
import * as _cluster from 'cluster';
import * as os from 'os';

const cluster = _cluster as unknown as _cluster.Cluster;

async function createNestApplication() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
    cors: true,
  });
  app.enableCors({
    origin: `${process.env.REDIRECT_URL}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');
}
// クラスタを設定
// https://qiita.com/akasatana12345/items/eab135e4e8599e97d364
if (cluster.isPrimary) {
  console.log(`Master server started on ${process.pid}`);
  // 開発環境の場合、fork数は2個とする
  const cpuCount = `${process.env.NODE_ENV}` == 'dev' ? 2 : os.cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    console.log('Forking for worker', i);
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`,
    );
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  console.log('Starting NestJS application as a worker');
  createNestApplication();
}
