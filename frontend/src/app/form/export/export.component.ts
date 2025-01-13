import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WizardComponent } from '../wizard/wizard.component';
import { CreditsService } from '../../services/credits/credits.service';
import { StyleService, Style } from '../../services/style.service';
import { CreditsI } from '../../services/credits/credits.interface';
import { Subject, takeUntil } from 'rxjs';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    WizardComponent
  ],
  templateUrl: './export.component.html',
  styleUrl: './export.component.css'
})
export class ExportComponent implements OnInit, OnDestroy {
    credits: CreditsI[] = [];
    style!: Style;
    format: string = "png";
    private destroy$ = new Subject<void>();
    @ViewChild('previewContainer') previewContainer!: ElementRef;

    constructor(
        private router: Router,
        private creditsService: CreditsService,
        private styleService: StyleService
    ) { }

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
    
    handleExport(): void {
        if (!this.previewContainer) return;

        const element = this.previewContainer.nativeElement;

        html2canvas(element, {
            backgroundColor: this.style.backgroundColor,
            scale: 2, 
            logging: false,
        }).then(canvas => {
            canvas.toBlob((blob) => {
                if (!blob) return;
                
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `movie-credits.${this.format}`;
                
                document.body.appendChild(link);
                link.click();
                
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, `image/${this.format}`);
        });
    }
}
