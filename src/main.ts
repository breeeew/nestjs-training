import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function main() {
  try {
    const PORT = process.env.PORT;

    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Boardings API')
      .setDescription('The Boardings API description')
      .setVersion('1.0')
      .build();

    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, doc);

    await app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}

main();
