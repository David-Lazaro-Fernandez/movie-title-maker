import { Component } from '@angular/core';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { WizardComponent } from '../wizard/wizard.component';
@Component({
  selector: 'app-import',
  standalone: true,
  imports: [FileUploaderComponent, WizardComponent],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css'
})
export class ImportComponent {

}
