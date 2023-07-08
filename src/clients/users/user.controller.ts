import { Controller, Get, HttpStatus, Inject, OnModuleInit, UseInterceptors } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersServiceClientOptions } from './user-svc.option';
import { PaginateQuery } from 'nestjs-paginate';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiCustomHeader } from '../../shared/swagger/decorator';
import { Pagination } from '@/common/dto/pagination.dto';
import { TransformResponseInterceptor } from '@/interceptors/response.interceptor';
import { PaginationFormat } from '@/interfaces/pagination-format.interface';
import { User } from '@/modules/users/entities/user.entity';
import { UserService } from '@/modules/users/services/users.service';

@ApiTags('Users')
@ApiCustomHeader()
@Controller('users')
@UseInterceptors(TransformResponseInterceptor)
export class UserController implements OnModuleInit {
    constructor(@Inject(UsersServiceClientOptions) private readonly userClient: ClientGrpc) {}

    private userService: UserService;

    onModuleInit() {
        this.userService = this.userClient.getService<UserService>('UserService');
    }

    @ApiOperation({ summary: 'Get All Users' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Successfully Populate Data',
    })
    @ApiQuery({ type: Pagination })
    @Get()
    async getAll(query: PaginateQuery): Promise<PaginationFormat<User>> {
        return this.userService.getAll(query);
    }
}
