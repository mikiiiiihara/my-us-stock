import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ControllerModule } from './controllers/controller.module';
import { PrismaService } from './prisma/prisma.service';
import { RepositoriesModule } from './repositories/repositories.module';
import { SchemaModule } from './schema/schema.module';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: {
        origin: `${process.env.REDIRECT_URL}`,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    CommonModule,
    SchemaModule,
    RepositoriesModule,
    ControllerModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
