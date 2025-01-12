import { FileProcessor, MovieTeamMember } from '../types';

export abstract class BaseFileProcessor implements FileProcessor {
  protected supportedTypes: string[];

  constructor(supportedTypes: string[]) {
    this.supportedTypes = supportedTypes;
  }

  abstract process(buffer: Buffer): Promise<MovieTeamMember[]>;

  supports(fileType: string): boolean {
    return this.supportedTypes.includes(fileType.toLowerCase());
  }

  protected validateAndNormalizeMember(data: any): MovieTeamMember | null {
    const name = data.name || data.Name || '';
    const role = data.role || data.Role || '';

    if (!name || !role) return null;

    return { name: name.trim(), role: role.trim() };
  }
}