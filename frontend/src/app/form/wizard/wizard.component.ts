import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
export type WizardStep = 'upload' | 'preview' | 'edit' | 'final';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  standalone:true,
  imports:[CommonModule],
  
})
export class WizardComponent {
  @Input() currentStep: WizardStep = 'upload';

  @Output() stepChange = new EventEmitter<WizardStep>();

  public visitedSteps = new Set<WizardStep>(['upload']);

  steps = [
    { id: 'upload' as WizardStep, title: 'Upload Files' },
    { id: 'preview' as WizardStep, title: 'Preview Data' },
    { id: 'edit' as WizardStep, title: 'Edit Credits' },
    { id: 'final' as WizardStep, title: 'Final Preview' }
  ];

  onStepClick(stepId: WizardStep) {
    const clickedIndex = this.steps.findIndex(step => step.id === stepId);
    
    this.steps.forEach((step, index) => {
      if (index <= clickedIndex) {
        this.visitedSteps.add(step.id);
      }
    });
    
    this.stepChange.emit(stepId);
  }

  public isStepVisited(stepId: WizardStep): boolean {
    return this.visitedSteps.has(stepId);
  }
}
