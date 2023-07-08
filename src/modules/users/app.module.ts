import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@/shared.module';
import { UserModule } from './users.module';
import { ConfigService } from '@/shared/services/config.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) => configService.typeOrmConfig,
            inject: [ConfigService],
        }),
        ConfigModule.forRoot(),
        LoggerModule.forRoot({
            pinoHttp: {
                safe: true,
                transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
            },
        }),
        UserModule,
    ],
})
export class AppModule {}
