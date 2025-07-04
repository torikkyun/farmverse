import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE') ?? 'Nest Boilerplate')
    .setDescription('Made with ❤️ by @torikkyun')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    configService.get('SWAGGER_PATH') ?? 'api-docs',
    app,
    documentFactory,
  );
}
