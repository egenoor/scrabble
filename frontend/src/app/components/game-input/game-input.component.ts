import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ScrabbleService } from '../../services/scrabble.service'
import { ServiceError } from '../common/errors/service.error'

@Component({
  selector: 'app-game-input',
  imports: [FormsModule],
  templateUrl: './game-input.component.html'
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
      error: (err: ServiceError) => {
        this.errorMsg = (err as ServiceError)?.error?.message ?? (err as Error)?.message ?? 'Something went wrong'
      }
    })
  }
}
