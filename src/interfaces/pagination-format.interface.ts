'use strict';

export interface PaginationFormat<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}
