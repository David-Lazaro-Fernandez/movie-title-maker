import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SiteHeaderComponent } from './layouts/site-header/site-header.component';
import { SiteFooterComponent } from './layouts/site-footer/site-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SiteFooterComponent, SiteHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Movie Maker';
}
