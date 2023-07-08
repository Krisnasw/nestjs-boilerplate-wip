'use strict';

import * as _ from 'lodash';

import { AbstractEntity } from '@common/abstract.entity';
import { AbstractDto } from '@common/dto/abstract.dto';

declare global {
    interface Array<T> {
        toDtos<B extends AbstractDto>(this: AbstractEntity[]): B[];
    }
}

Array.prototype.toDtos = function <B extends AbstractDto>(): B[] {
    return _(this)
        .map((item) => {
            item = item.toDto();
            for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    const element = item[key];
                    if (element instanceof AbstractEntity) {
                        if (Array.isArray(element)) {
                            item[key] = element.toDtos();
                        } else {
                            item[key] = element.toDto();
                        }
                    }
                }
            }
            return item;
        })
        .compact()
        .value() as B[];
};
