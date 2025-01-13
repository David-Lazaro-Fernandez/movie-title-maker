import { Component, OnInit } from '@angular/core';
import { CreditsI } from '../../services/credits/credits.interface';
import { CreditsService } from '../../services/credits/credits.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { WizardComponent } from '../wizard/wizard.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, WizardComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent implements OnInit{
    creditsData: CreditsI[] = []

    constructor(private creditsService: CreditsService, private router:Router){}

    ngOnInit():void{
      this.getCredits();
    }

    getCredits(){
      this.creditsData = this.creditsService.getCredits()
      console.log(this.creditsService.getCredits())
    }

    handleNameChange(index: number, event: Event): void {
      const input = event.target as HTMLInputElement;
      this.creditsData[index].name = input.value;
    }
  
    handleRoleChange(index: number, event: Event): void {
      const select = event.target as HTMLSelectElement;
      this.creditsData[index].role = select.value;
    }
  
    addCredit(): void {
      this.creditsData.push({ role: '', name: '' });
    }
  
    removeCredit(index: number): void {
      this.creditsData.splice(index, 1);
    }
  
    continueToStyle(): void {
      this.creditsService.updateCredits(this.creditsData);
      this.router.navigate(['/form/style']);
    }
}
