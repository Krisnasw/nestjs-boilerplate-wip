import { QueryBuilder, SelectQueryBuilder } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserQuery extends SelectQueryBuilder<User> {
    constructor(queryBuilder: QueryBuilder<User>) {
        super(queryBuilder);
    }

    whereId = (id: string) => {
        return this.andWhere('id = :id', { id });
    };
}
