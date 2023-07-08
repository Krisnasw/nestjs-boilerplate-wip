import { Repository, SelectQueryBuilder } from 'typeorm';

export class AbstractQuery<T> extends SelectQueryBuilder<T> {
    protected table = '';

    constructor(_repository: Repository<T> | any, alias?: string) {
        super(_repository.createQueryBuilder(alias ?? _repository.table));
        this.table = alias ?? _repository.table;
    }

    whereId(id: string) {
        return this.andWhere(`${this.table}.id = :id`, { id });
    }

    whereIdIn(ids: Array<string>) {
        return this.andWhere(`${this.table}.id IN(:...ids)`, { ids });
    }
}
