import { AbstractDto } from '@/common/dto/abstract.dto';

export interface BaseEntityInterface {
    toDto(): AbstractDto;

    toMock(): object;
}
