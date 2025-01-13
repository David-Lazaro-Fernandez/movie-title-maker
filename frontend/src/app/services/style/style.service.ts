import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Style {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  spacing: number;
  font: string;
}

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private defaultStyle: Style = {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    fontSize: 24,
    spacing: 40,
    font: "inter"
  };

  private styleSubject = new BehaviorSubject<Style>(this.defaultStyle);

  setStyle(style: Style): void {
    this.styleSubject.next(style);
  }

  getStyle(): Observable<Style> {
    return this.styleSubject.asObservable();
  }
} 