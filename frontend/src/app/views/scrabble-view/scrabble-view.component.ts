import { Component } from '@angular/core'
import { BackButtonComponent } from "../../components/common/back-button/back-button.component"
import { GameInputComponent } from "../../components/game-input/game-input.component"

@Component({
  selector: 'app-scrabble-view',
  imports: [GameInputComponent, BackButtonComponent],
  templateUrl: './scrabble-view.component.html',
  styleUrl: './scrabble-view.component.css'
})
export class ScrabbleViewComponent {

}
