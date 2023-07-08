import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

const bootstrap = async () => {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: `${process.env.USER_SVC_HOST}:${process.env.USER_SVC_PORT}`,
            package: 'users',
            protoPath: join(__dirname, './_proto/users.proto'),
            loader: {
                enums: String,
                objects: true,
                arrays: true,
            },
        },
    });

    app.useLogger(app.get(Logger));

    return app.listen();
};

bootstrap();
