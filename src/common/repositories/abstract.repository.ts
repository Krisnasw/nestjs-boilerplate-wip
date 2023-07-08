import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { QueryRunnerException } from '../../exceptions/query-runner.exception';

export class AbstractRepository<Entity> extends Repository<Entity> {
    dataSource: DataSource;
    queryClass: any;

    async safeTransaction(func, options = { onError: undefined }) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const response = await func(queryRunner);
            await queryRunner.commitTransaction();
            return response;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            if (!options.onError) {
                throw new QueryRunnerException();
            }
            options.onError(err);
        } finally {
            await queryRunner.release();
        }
    }

    queryBuilder() {
        return new this.queryClass(this);
    }

    async excelRows(options?: FindManyOptions) {
        const items: any = await this.find(options);
        return items.map((item: any) => item.toExcel());
    }
}
