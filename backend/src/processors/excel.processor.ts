import { BaseFileProcessor } from './base.processor';
import { MovieTeamMember } from '../types';
import * as XLSX from 'xlsx';

export class ExcelProcessor extends BaseFileProcessor {
  constructor() {
    super(['xlsx', 'xls']);
  }

  async process(buffer: Buffer): Promise<MovieTeamMember[]> {
    const workbook = XLSX.read(buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    return data
      .map(row => this.validateAndNormalizeMember(row))
      .filter((member): member is MovieTeamMember => member !== null);
  }
}