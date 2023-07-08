import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { UserController } from './user.controller';
import { UserRepository } from '@/modules/users/repository/user.repository';
import { UserService } from '@/modules/users/services/users.service';

@Module({
    imports: [
        LoggerModule.forRoot({
            pinoHttp: {
                safe: true,
                transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
            },
        }),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserGatewayModule {}
