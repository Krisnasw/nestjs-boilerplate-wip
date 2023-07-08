export interface PaginationQueryInterface {
    page?: number;
    limit?: number;
    sortBy?: string | Array<string>;
    searchBy?: string;
    search?: string;
    filter?: {
        [column: string]: string | string[];
    };
    path?: string;
    sortType?: string;
}
