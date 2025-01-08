import { Component } from '@angular/core'
import { BackButtonComponent } from "../../components/common/back-button/back-button.component"
import { WordInputComponent } from "../../components/word-input/word-input.component"

@Component({
  selector: 'app-setup-view',
  imports: [BackButtonComponent, WordInputComponent],
  templateUrl: './setup-view.component.html',
  styleUrl: './setup-view.component.css'
})
export class SetupViewComponent {

}
