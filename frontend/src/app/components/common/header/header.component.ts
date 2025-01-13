import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';

@Component({
  selector: 'app-header',
  imports: [BackButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentPath = '';
  constructor(private router: Router) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentPath = this.router.url;
      }
    });
  }
}
