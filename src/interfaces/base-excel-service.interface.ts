import { IFile } from './file.interface';

export interface BaseExcelServiceInterface {
    exportToExcel(): Promise<any>;
    importFromExcel(file: IFile): Promise<any>;
}
