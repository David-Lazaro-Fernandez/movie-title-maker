// Core interfaces for the domain
export interface MovieTeamMember {
    name: string;
    role: string;
  }
  
  export interface ProcessedResponse {
    success: boolean;
    data: MovieTeamMember[];
    errors?: ProcessingError[];
  }
  
  export interface FileProcessor {
    process(buffer: Buffer): Promise<MovieTeamMember[]>;
    supports(fileType: string): boolean;
  }
  
  export interface ProcessingError {
    fileName: string;
    message: string;
    type: 'PARSING' | 'VALIDATION' | 'UNSUPPORTED_TYPE';
  }
  
  export interface FileProcessingConfig {
    maxFileSize: number;
    maxFiles: number;
    allowedTypes: string[];
  }
  
  export interface ProcessingResult {
    members: MovieTeamMember[];
    errors?: ProcessingError[];
  }