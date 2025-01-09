import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ScrabbleService } from '../../services/scrabble.service'
import { ErrorMessage } from '../common/types/response.type'

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
  errorMsg = "";

  calculatePoints() {
    this.errorMsg = "";
    this.scrabbleService.calculatePoints(this.word)
    .subscribe({
      next: res => {this.points += res},
      error: (err: ErrorMessage) => this.errorMsg = err.error.message
    })
  }
}
