import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceError } from '../../components/common/errors/service.error';
import { ScrabbleService } from '../../services/scrabble.service';
import { isNonNumericString } from '../../util/input.validator';

@Component({
  selector: 'app-scrabble-view',
  imports: [FormsModule],
  templateUrl: './scrabble-view.component.html',
})
export class ScrabbleViewComponent {
  constructor(private scrabbleService: ScrabbleService) {}
  word = '';
  points = 0;
  errorMsg = '';

  onWordChange() {
    if (isNonNumericString(this.word) || this.word === '') {
      this.errorMsg = '';
    } else {
      this.points = 0;
      this.errorMsg = 'Word may only contain letters';
    }
  }

  calculatePoints() {
    this.errorMsg = '';
    this.scrabbleService.calculatePoints(this.word).subscribe({
      next: (res) => {
        this.points = res;
      },
      error: (err: ServiceError) => {
        this.errorMsg = err.message;
        this.points = 0;
      },
    });
  }
}
