import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BackButtonComponent } from "../../components/common/back-button/back-button.component"
import { ServiceError } from '../../components/common/errors/service.error'
import { ScrabbleService } from '../../services/scrabble.service'

@Component({
  selector: 'app-scrabble-view',
  imports: [BackButtonComponent, FormsModule],
  templateUrl: './scrabble-view.component.html',
})
export class ScrabbleViewComponent {
constructor(private scrabbleService: ScrabbleService){}
  word = "";
  points = 0
  errorMsg = "";

  calculatePoints() {
    this.errorMsg = "";
    this.scrabbleService.calculatePoints(this.word)
    .subscribe({
      next: res => {
        this.points = res
      },
      error: (err: ServiceError) => {
        this.errorMsg = err.message
      }
    })
  }
}
