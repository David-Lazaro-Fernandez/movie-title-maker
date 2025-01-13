import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CreditsService } from '../../services/credits/credits.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})

export class FileUploaderComponent {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  files: File[] = []; 

  constructor(
    private creditsService:CreditsService,
    private router:Router
  ) { }

  ngOnInit(): void { }

  onChange(event: any) {
    const selectedFiles = Array.from(event.target.files) as File[];

    if (selectedFiles.length > 0) {
      this.status = 'initial';
      this.files = [...this.files, ...selectedFiles];
    }
  }

  onUpload() {
    if (this.files.length === 0) {
      return;
    }
  
    this.status = 'uploading'; 
  
    const formData = new FormData();
    this.files.forEach((file) => {
      formData.append('files', file);
    });
  
    this.creditsService.uploadCredits(formData).subscribe({
      next: (response) => {
        this.status = 'success';
        console.log('Respuesta del servidor:', response);
        
        this.router.navigate(['/form/edit']);
      },
      error: (error) => {
        console.error('Error al subir los archivos:', error);
        this.status = 'fail';
      },
    });
  }

  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase(); 
    const iconMap: { [key: string]: string } = {
      csv: 'assets/icons/CSV.png',
      docx: 'assets/icons/DOCX.png',
      json: 'assets/icons/JSON.png',
      md: 'assets/icons/MD.png',
      pdf: 'assets/icons/PDF.png',
      txt: 'assets/icons/TXT.png',
      xlsx: 'assets/icons/XLSX.png',
      xml: 'assets/icons/XML.png',
    };

    return iconMap[extension || ''] || 'assets/icons/default.png';
  }
}
