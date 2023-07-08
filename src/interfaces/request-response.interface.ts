export interface QueryResponse<T> {
    totalRecords: number;
    totalPages: number;
    page: number;
    limit: number;
    data: Array<T>;
}

export interface RequestQuery {
    search: string;
    select: string;
    orderBy: string;
    page: number;
    limit: number;
}
