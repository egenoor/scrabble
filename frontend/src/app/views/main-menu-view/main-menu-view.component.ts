import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-main-menu-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main-menu-view.component.html',
  styleUrl: './main-menu-view.component.css'
})
export class MainMenuViewComponent {
}
