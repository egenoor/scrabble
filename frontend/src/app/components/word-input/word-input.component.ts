import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ScrabbleService } from '../../services/scrabble.service'
import { ErrorMessage } from '../common/types/response.type'

@Component({
  selector: 'app-word-input',
  imports: [FormsModule],
  templateUrl: './word-input.component.html'
})
export class WordInputComponent {
  constructor(private scrabbleService: ScrabbleService){}
  word = "";
  errorMsg = "";
  successfulRequest = false;

  addNewWord() {
    this.errorMsg = "";
    this.scrabbleService.addNewWord(this.word)
    .subscribe({
      next: _res => {
        this.word = "";
        this.successfulRequest = true;
      },
      error: (err: ErrorMessage) => this.errorMsg = err.error.message
    })
  }
}
