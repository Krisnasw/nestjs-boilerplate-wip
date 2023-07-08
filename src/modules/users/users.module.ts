import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { UserController } from './controllers/users.controller';
import { UserService } from './services/users.service';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
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
export class UserModule {}
