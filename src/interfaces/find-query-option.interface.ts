export interface FindQueryOption {
    withDeleted?: boolean;
    withRelations?: boolean;
    toDto?: boolean;
}

export const DefaultFindQueryOption = {
    withDeleted: false,
    withRelations: true,
    toDto: true,
};
