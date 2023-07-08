import { Response } from 'express';
import { IFile } from './file.interface';

export interface BaseExcelControllerInterface {
    exportExcel(res: Response);
    importExcel(file: IFile);
}
