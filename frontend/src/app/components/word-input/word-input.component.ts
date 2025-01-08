import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ScrabbleService } from '../../services/scrabble.service'

@Component({
  selector: 'app-word-input',
  imports: [FormsModule],
  templateUrl: './word-input.component.html',
  styleUrl: './word-input.component.css'
})
export class WordInputComponent {
  constructor(private scrabbleService: ScrabbleService){}
  word = "";
  errorMsg = "";

  addNewWord() {
    this.scrabbleService.addNewWord(this.word).pipe().subscribe((response) => {
      return response;
    })
  }
}
