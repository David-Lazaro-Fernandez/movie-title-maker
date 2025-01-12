import { FileProcessingConfig } from '../types';

export const processingConfig: FileProcessingConfig = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxFiles: 10,
  allowedTypes: ['csv', 'xlsx', 'xls', 'txt', 'docx', 'md']
};