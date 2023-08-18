import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestInterceptor, ClassSerializerInterceptor, ValidationPipe, VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import morgan from 'morgan';
import { i18nValidationErrorFactory } from 'nestjs-i18n';
import { ContextRequestInterceptor } from './interceptors/context-request.interceptor';
import { NewrelicInterceptor } from './interceptors/newrelic.interceptor';
import { SharedModule } from './shared.module';
import { ConfigService } from './shared/services/config.service';
import { setupSwagger } from './shared/swagger/setup';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const configService = app.select(SharedModule).get(ConfigService);
    const reflector = app.get(Reflector);
    let globalInterceptors: NestInterceptor[] = [new ContextRequestInterceptor(configService), new ClassSerializerInterceptor(reflector)];

    // NEWRELIC
    if (configService.newrelic.enabled) {
        globalInterceptors = [...globalInterceptors, new NewrelicInterceptor(configService)];
    }

    // const loggerService = app.select(SharedModule).get(LoggerService);
    // app.useLogger(loggerService);
    // if (configService.log.morgan.enabled) {
    //     app.use(
    //         morgan('combined', {
    //             stream: {
    //                 write: (message) => {
    //                     loggerService.log(message);
    //                 },
    //             },
    //         }),
    //     );
    // }

    app.use(helmet());

    if (configService.rateLimit.enabled) {
        console.log('RATE_LIMIT', configService.rateLimit.enabled);
        app.use(
            rateLimit({
                windowMs: configService.rateLimit.windowMs,
                max: configService.rateLimit.max, // limit each IP to 100 requests per windowMs
            }),
        );
    }

    // app.useGlobalFilters(
    //     new NotFoundExceptionFilter(loggerService),
    //     new HttpExceptionFilter(loggerService),
    //     new CustomI18nValidationExceptionFilter(),
    // );
    app.useGlobalInterceptors(...globalInterceptors);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: i18nValidationErrorFactory,
            validationError: {
                target: false,
            },
        }),
    );
    app.enableVersioning({
        type: VersioningType.HEADER,
        header: configService.app.versionKey,
        defaultVersion: configService.app.versionDefault || VERSION_NEUTRAL,
    });

    if (['development', 'staging'].includes(configService.nodeEnv)) {
        setupSwagger(app, configService.swaggerConfig);
    }

    const port = configService.getNumber('PORT') || 3000;
    const host = configService.get('HOST') || '127.0.0.1';
    if (configService.app.cors) {
        app.enableCors();
    }
    await app.listen(port, host);

    console.warn(`server running on port ${host}:${port}`);
}
bootstrap();
