import { Injectable } from '@angular/core';
import { CreditsI } from './credits.interface';
import { HttpClient } from '@angular/common/http';
import { UploadResponseI } from '../../form/file-uploader/file-uploader.interface';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CreditsService {
  private credits = new BehaviorSubject<CreditsI[]>([]);
  uploadURL = 'http://localhost:3000/api/files/upload'
  constructor(private http:HttpClient) { }

  getCredits(): CreditsI[] {
    return this.credits.value;
  }

  getCreditsAsObservable(): Observable<CreditsI[]> {
    return this.credits.asObservable();
  }

  updateCredits(newCredits: CreditsI[]): void {
    this.credits.next(newCredits);
  }

  uploadCredits(formData: FormData): Observable<UploadResponseI> {
    return new Observable<UploadResponseI>((observer) => {
      this.http.post<UploadResponseI>(this.uploadURL, formData).subscribe({
        next: (response) => {
          this.credits.next(response.data); 
          observer.next(response);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }
}