import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AbstractRequestContext } from './common/contexts/AbstractRequestContext';
import { SharedModule } from './shared.module';
import { ConfigService } from './shared/services/config.service';
import { UserModule } from './modules/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) => configService.typeOrmConfig,
            inject: [ConfigService],
        }),
        LoggerModule.forRoot({
            pinoHttp: {
                safe: true,
                transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
            },
        }),
        RequestContextModule.forRoot({
            contextClass: AbstractRequestContext,
            isGlobal: true,
        }),
        EventEmitterModule.forRoot(),
        TerminusModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
