import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { FindQueryOption } from './find-query-option.interface';
import { AbstractEntity } from '@/common/abstract.entity';

export interface BaseRepositoryInterface {
    table: string;
    queryClass: any;

    getPagination(query: PaginateQuery): Promise<Paginated<AbstractEntity | any>>;

    findEntity(id: string, option: FindQueryOption): Promise<AbstractEntity | any>;

    createEntity(dto: any): Promise<any>;

    updateEntity(criteria: any, dto: any): Promise<AbstractEntity>;

    deleteEntity(id: string): Promise<AbstractEntity | any>;
}
