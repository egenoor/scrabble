import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ScrabbleService } from '../../services/scrabble.service'

@Component({
  selector: 'app-game-input',
  imports: [FormsModule],
  templateUrl: './game-input.component.html',
  styleUrl: './game-input.component.css'
})
export class GameInputComponent {
  constructor(private scrabbleService: ScrabbleService){}
  word = "";
  points = 0
  calculateErrorMsg = "";

  calculatePoints() {
    this.scrabbleService.calculatePoints(this.word).pipe().subscribe((response) => {
      this.points += response;
    })
  }
}
