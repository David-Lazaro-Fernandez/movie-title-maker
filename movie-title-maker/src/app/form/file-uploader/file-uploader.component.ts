import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial'; // Variable para estado
  files: File[] = []; // Lista de archivos seleccionados

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  // Manejar selección de archivos
  onChange(event: any) {
    const selectedFiles = Array.from(event.target.files) as File[];

    if (selectedFiles.length > 0) {
      this.status = 'initial';
      this.files = selectedFiles;
    }
  }

  // Subir todos los archivos
  onUpload() {
    if (this.files.length === 0) {
      return;
    }

    this.status = 'uploading';
    const uploadRequests = this.files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);

      // Enviar solicitud para subir cada archivo
      return this.http.post('/upload', formData).toPromise();
    });

    // Manejar todas las solicitudes de subida
    Promise.all(uploadRequests)
      .then(() => {
        this.status = 'success';
      })
      .catch(() => {
        this.status = 'fail';
      });
  }

  /**
   * Función para obtener el ícono basado en la extensión del archivo
   */
  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase(); // Obtener la extensión del archivo
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

    return iconMap[extension || ''] || 'assets/icons/default.png'; // Devuelve un ícono por defecto si no hay coincidencia
  }
}
