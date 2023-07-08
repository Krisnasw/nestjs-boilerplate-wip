import { join } from 'path';
import { Transport, ClientOptions } from '@nestjs/microservices';

export const UsersServiceClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: `${process.env.USER_SVC_HOST}:${process.env.USER_SVC_PORT}`,
        package: 'users',
        protoPath: join(__dirname, '../_proto/users.proto'),
    },
};
