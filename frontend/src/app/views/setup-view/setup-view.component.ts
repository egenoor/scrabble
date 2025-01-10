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
  successfulRequest = false;

  addNewWord() {
    this.errorMsg = "";
    this.scrabbleService.addNewWord(this.word)
    .subscribe({
      next: _res => {
        this.word = "";
        this.successfulRequest = true;
      },
      error: (err: unknown) => {
        this.errorMsg = (err as ServiceError)?.error?.message ?? (err as Error)?.message
      }
    })
  }
}
