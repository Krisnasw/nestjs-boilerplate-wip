import { Injectable } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entities/user.entity';
import { AbstractEntity } from '@/common/abstract.entity';
import { AbstractDto } from '@/common/dto/abstract.dto';
import { BaseServiceInterface } from '@/interfaces/base-service.interface';
import { FindQueryOption } from '@/interfaces/find-query-option.interface';
import { PaginationFormat } from '@/interfaces/pagination-format.interface';
import { formatPagination } from '@/shared/typeorm/pagination/format.pagination';

@Injectable()
export class UserService implements BaseServiceInterface {
    constructor(private readonly _userRepository: UserRepository) {}

    getAll = async (query: PaginateQuery): Promise<PaginationFormat<User>> => {
        const data = await this._userRepository.getPagination(query);
        return formatPagination(data);
    };

    findOneById = async (id: string, option: FindQueryOption): Promise<AbstractEntity | AbstractDto> => {
        const data = await this._userRepository.findEntity(id, option);
        return option.toDto ? data.toDto() : data;
    };

    create(dto: any, image?: any): Promise<AbstractEntity> {
        throw new Error('Method not implemented.');
    }

    update(id: string, dto: any, image?: any): Promise<AbstractEntity> {
        throw new Error('Method not implemented.');
    }

    delete = async (id: string): Promise<AbstractEntity | AbstractDto> => {
        try {
            return await this._userRepository.deleteEntity(id);
        } catch (err) {
            throw err;
        }
    };
}
