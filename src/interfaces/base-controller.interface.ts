import { PaginateQuery } from 'nestjs-paginate';
import { PaginationFormat } from './pagination-format.interface';
import { AbstractEntity } from '@/common/abstract.entity';
import { AbstractDto } from '@/common/dto/abstract.dto';
import { IdRequestParamDto } from '@/common/dto/id-request-param.dto';

export interface BaseControllerInterface {
    getPaginated(query: PaginateQuery): Promise<PaginationFormat<AbstractEntity>>;

    findOne(params: IdRequestParamDto): Promise<AbstractEntity | AbstractDto>;

    create(dto: any, image?: any): Promise<AbstractEntity | AbstractDto>;

    update(params: IdRequestParamDto, dto: any, ...files: any): Promise<AbstractEntity | AbstractDto>;

    delete(params: IdRequestParamDto): Promise<AbstractEntity | AbstractDto>;
}
