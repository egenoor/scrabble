import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BackButtonComponent } from "../../components/common/back-button/back-button.component"
import { ServiceError } from '../../components/common/errors/service.error'
import { ScrabbleService } from '../../services/scrabble.service'

@Component({
  selector: 'app-setup-view',
  imports: [BackButtonComponent, FormsModule],
  templateUrl: './setup-view.component.html'
})
export class SetupViewComponent {
  constructor(private scrabbleService: ScrabbleService){}
  word = "";
  errorMsg = "";
  isSuccessfulRequest = false;

  addNewWord() {
    this.scrabbleService.addNewWord(this.word)
    .subscribe({
      next: _res => {
        this.errorMsg = "";
        this.word = "";
        this.isSuccessfulRequest = true;
      },
      error: (err: ServiceError) => {
        this.errorMsg = err.message
      }
    })
  }
}
