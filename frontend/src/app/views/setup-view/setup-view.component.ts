import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceError } from '../../components/common/errors/service.error';
import { ScrabbleService } from '../../services/scrabble.service';
import { isNonNumericString } from '../../util/input.validator';

@Component({
  selector: 'app-setup-view',
  imports: [FormsModule],
  templateUrl: './setup-view.component.html',
})
export class SetupViewComponent {
  constructor(private scrabbleService: ScrabbleService) {}
  word = '';
  errorMsg = '';
  successMsg = '';

  onWordChange() {
    this.successMsg = '';
    if (isNonNumericString(this.word) || this.word === '') {
      this.errorMsg = '';
    } else {
      this.errorMsg = 'Word may only contain letters';
    }
  }

  addNewWord() {
    this.scrabbleService.addNewWord(this.word).subscribe({
      next: () => {
        this.errorMsg = '';
        this.word = '';
        this.successMsg = 'Word was added to dictionary';
      },
      error: (err: ServiceError) => {
        this.errorMsg = err.message;
      },
    });
  }
}
