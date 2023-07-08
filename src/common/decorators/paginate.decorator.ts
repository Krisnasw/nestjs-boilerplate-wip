import paginateQueryResolverUtils from '@/shared/utils/paginate-query-resolver.utils';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Paginate = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const { query } = ctx.switchToHttp().getRequest();
    return paginateQueryResolverUtils(query);
});
