import { BaseFileProcessor } from './base.processor';
import { MovieTeamMember } from '../types';
import Papa from 'papaparse';

export class CSVProcessor extends BaseFileProcessor {
  constructor() {
    super(['csv']);
  }

  async process(buffer: Buffer): Promise<MovieTeamMember[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(buffer.toString(), {
        header: true,
        complete: (results) => {
          const members = results.data
            .map(row => this.validateAndNormalizeMember(row))
            .filter((member): member is MovieTeamMember => member !== null);
          resolve(members);
        },
        error: (error:Error) => reject(error)
      });
    });
  }
}