import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StyleService, Style } from '../../services/style.service';
import { CreditsService } from '../../services/credits/credits.service';
import { CreditsI } from '../../services/credits/credits.interface';
import { Subject, takeUntil } from 'rxjs';
import { WizardComponent } from '../wizard/wizard.component';

@Component({
  selector: 'app-title-style',
  standalone: true,
  imports: [CommonModule, FormsModule, WizardComponent],
  templateUrl: './title-style.component.html',
})
export class TitleStyleComponent implements OnInit, OnDestroy {
  style: Style = {
    backgroundColor: "#000000",
    roleColor: "#888888",
    roleFontSize: 20,
    nameColor: "#ffffff",
    nameFontSize: 28,
    spacing: 40,
    font: "inter"
  };
  
  credits: CreditsI[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private styleService: StyleService,
    private creditsService: CreditsService
  ) {}

  ngOnInit(): void {
    this.creditsService.getCreditsAsObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(credits => {
        this.credits = credits;
      });

    this.styleService.getStyle()
      .pipe(takeUntil(this.destroy$))
      .subscribe(style => {
        this.style = style;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onStyleChange(): void {
    this.styleService.setStyle(this.style);
  }

  goToExport(): void {
    this.styleService.setStyle(this.style);
    this.router.navigate(['/form/export']);
  }
}
