'use strict';

import { BadRequestException } from '@nestjs/common';

export class CustomBadRequestException extends BadRequestException {
    constructor(payload: object = null, message: string | object | any = 'Bad Request', error?: string) {
        if (typeof message === 'object') {
            for (const key in message) {
                if (Object.prototype.hasOwnProperty.call(message, key)) {
                    const element = message[key];
                    payload[element.property] = Object.values(element.constraints)[0];
                }
            }
            super(
                {
                    errorCode: 1000,
                    message: 'Bad Request.',
                    payload,
                },
                error,
            );
        } else {
            super(
                {
                    errorCode: 1000,
                    message,
                    payload,
                },
                error,
            );
        }
    }
}
