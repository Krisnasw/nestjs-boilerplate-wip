export interface BaseExcelEntityInterface {
    toExcel(): Array<any>;
    toImportDto(row);
}
