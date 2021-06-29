import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import SecureSessionPlugin from 'fastify-secure-session';
import fastifyPassport from 'fastify-passport';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app
    .register(SecureSessionPlugin, {
      secret: 'myverylongserectthatisover32characterslong',
      salt: 'saltwithlength16',
      cookie: {
        path: '/',
        httpOnly: true,
      },
    })
    .then((fastifyInstance) =>
      fastifyInstance.after(() => {
        console.log('SecureSessionPlugin completed');
      }),
    );
  app.register(fastifyPassport.initialize()).then((fastifyInstance) =>
    fastifyInstance.after(() => {
      console.log('fastifyPassport.initialize completed');
    }),
  );
  app.register(fastifyPassport.secureSession()).then((fastifyInstance) =>
    fastifyInstance.after(() => {
      console.log('fastifyPassport.secureSession completed');
    }),
  );

  await app.listen(3001);
}
bootstrap();
