import { Injectable } from '@nestjs/common';
import { I18nService, TranslateOptions } from 'nestjs-i18n/dist/services/i18n.service';
import { RequestContext } from '@medibloc/nestjs-request-context';
import { AbstractRequestContext } from '@/common/contexts/AbstractRequestContext';
import { ConfigService } from './config.service';

@Injectable()
export class TranslationService {
    constructor(private readonly i18n: I18nService, private readonly configService: ConfigService) {}

    async translate(key: string, options: TranslateOptions = {}): Promise<string> {
        const ctx: AbstractRequestContext = RequestContext.get();

        return this.i18n.translate(key, {
            lang: ctx.lang || this.configService.app.defaultLang,
            ...options,
        });
    }
}
