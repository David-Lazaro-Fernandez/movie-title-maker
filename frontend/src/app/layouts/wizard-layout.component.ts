import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WizardComponent } from '../form/wizard/wizard.component';
import { WizardStep } from '../form/wizard/wizard.component';

@Component({
  selector: 'app-wizard-layout',
  standalone: true,
  imports: [RouterOutlet, WizardComponent],
  template: `
    <app-wizard 
      [currentStep]="currentStep"
      (stepChange)="onStepChange($event)"
    ></app-wizard>
    <router-outlet></router-outlet>
  `
})
export class WizardLayoutComponent {
  currentStep: WizardStep = 'upload';

  onStepChange(newStep: WizardStep) {
    this.currentStep = newStep;
  }
} 