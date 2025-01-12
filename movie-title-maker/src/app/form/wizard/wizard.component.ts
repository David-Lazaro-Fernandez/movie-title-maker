import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// Define aquí tu tipo de pasos
export type WizardStep = 'upload' | 'preview' | 'edit' | 'final';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  standalone:true,
  imports:[CommonModule],
  
})
export class WizardComponent {
  // Equivale a "currentStep" en React
  @Input() currentStep: WizardStep = 'upload';

  // Equivale a "onStepChange" en React
  @Output() stepChange = new EventEmitter<WizardStep>();

  // Pasos fijos (puedes parametrizarlos con un @Input() steps: WizardStepDefinition[] si quieres)
  steps = [
    { id: 'upload' as WizardStep, title: 'Upload Files' },
    { id: 'preview' as WizardStep, title: 'Preview Data' },
    { id: 'edit' as WizardStep, title: 'Edit Credits' },
    { id: 'final' as WizardStep, title: 'Final Preview' }
  ];

  // Función que se llama al hacer clic en cada paso
  onStepClick(stepId: WizardStep) {
    this.stepChange.emit(stepId);
  }
}
