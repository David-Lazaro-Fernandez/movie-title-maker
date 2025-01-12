import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { processingConfig } from './config';
import { FileProcessingService } from './services/file-processing.service';
import { CSVProcessor } from './processors/csv.processor';
import { ExcelProcessor } from './processors/excel.processor';
import { ProcessedResponse, MovieTeamMember, ProcessingError } from './types';

const app = express();
app.use(cors());

// Configure multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: processingConfig.maxFileSize,
    files: processingConfig.maxFiles
  }
});

// Initialize services
const fileProcessingService = new FileProcessingService(
  processingConfig,
  [
    new CSVProcessor(),
    new ExcelProcessor(),
    // Add other processors here
  ]
);

// Main route handler
app.post('/process-files', upload.array('files'), async (req, res): Promise<void> => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      res.status(400).json({
        success: false,
        errors: [{
          fileName: 'request',
          message: 'No files uploaded',
          type: 'VALIDATION'
        }]
      });
      return;
    }

    const results = await Promise.all(
      (req.files as Express.Multer.File[]).map(file => 
        fileProcessingService.processFile(file)
      )
    );

    // Combine all results
    const allMembers: MovieTeamMember[] = [];
    const allErrors: ProcessingError[] = [];

    results.forEach(result => {
      allMembers.push(...result.members);
      if (result.errors) {
        allErrors.push(...result.errors);
      }
    });

    // Remove duplicates
    const uniqueMembers = Array.from(
      new Map(
        allMembers.map(member => 
          [`${member.name}-${member.role}`, member]
        )
      ).values()
    );

    const response: ProcessedResponse = {
      success: allErrors.length === 0,
      data: uniqueMembers,
      ...(allErrors.length && { errors: allErrors })
    };

    res.json(response);
    return;

  } catch (error) {
    res.status(500).json({
      success: false,
      errors: [{
        fileName: 'server',
        message: `Server error: ${error.message}`,
        type: 'VALIDATION'
      }]
    });
    return;
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});