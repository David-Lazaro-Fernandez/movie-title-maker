import { Component } from '@angular/core';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
@Component({
  selector: 'app-import',
  standalone: true,
  imports: [FileUploaderComponent],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css'
})
export class ImportComponent {

}
