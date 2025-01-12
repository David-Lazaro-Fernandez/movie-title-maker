import { 
    FileProcessor, 
    ProcessingResult,
    FileProcessingConfig 
  } from '../types';
  
  export class FileProcessingService {
    private processors: FileProcessor[];
  
    constructor(
      private config: FileProcessingConfig,
      processors: FileProcessor[]
    ) {
      this.processors = processors;
    }
  
    async processFile(file: Express.Multer.File): Promise<ProcessingResult> {
      const fileType = this.getFileType(file.originalname);
      
      if (!this.isFileTypeAllowed(fileType)) {
        return {
          members: [],
          errors: [{
            fileName: file.originalname,
            message: `Unsupported file type: ${fileType}`,
            type: 'UNSUPPORTED_TYPE'
          }]
        };
      }
  
      const processor = this.getProcessor(fileType);
      if (!processor) {
        return {
          members: [],
          errors: [{
            fileName: file.originalname,
            message: `No processor found for file type: ${fileType}`,
            type: 'UNSUPPORTED_TYPE'
          }]
        };
      }
  
      try {
        const members = await processor.process(file.buffer);
        return { members };
      } catch (error) {
        return {
          members: [],
          errors: [{
            fileName: file.originalname,
            message: (error as Error).message,
            type: 'PARSING'
          }]
        };
      }
    }
  
    private getFileType(filename: string): string {
      return filename.split('.').pop()?.toLowerCase() || '';
    }
  
    private isFileTypeAllowed(fileType: string): boolean {
      return this.config.allowedTypes.includes(fileType);
    }
  
    private getProcessor(fileType: string): FileProcessor | undefined {
      return this.processors.find(processor => processor.supports(fileType));
    }
  }