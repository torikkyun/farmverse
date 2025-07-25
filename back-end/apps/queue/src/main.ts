import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { QueueModule } from './queue.module';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    QueueModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [configService.get<string>('RABBITMQ_URL')!],
        queue: 'farmverse_queue',
        queueOptions: { durable: true },
      },
    },
  );
  await app.listen();
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
