import { Component } from '@angular/core'
import { ScrabbleViewComponent } from "./views/scrabble-view/scrabble-view.component"

@Component({
  selector: 'app-root',
  imports: [ScrabbleViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
