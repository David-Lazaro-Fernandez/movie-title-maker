import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css'
})
export class SiteHeaderComponent {
  isMenuOpen: boolean = false; // Controla si el menú está abierto

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
