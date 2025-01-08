import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { GameInputComponent } from "../../components/game-input/game-input.component"

@Component({
  selector: 'app-scrabble-view',
  imports: [GameInputComponent, RouterLink],
  templateUrl: './scrabble-view.component.html',
  styleUrl: './scrabble-view.component.css'
})
export class ScrabbleViewComponent {

}
