import { Injectable } from '@nestjs/common';
import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios/dist';
import { ConfigService } from './config.service';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createHttpOptions(): HttpModuleOptions {
        return {
            timeout: Number(this.configService.get('HTTP_TIMEOUT') ?? 30000),
            maxRedirects: Number(this.configService.get('HTTP_MAX_REDIRECTS') ?? 5),
        };
    }
}
