import { Routes } from '@angular/router'
import { MainMenuViewComponent } from './views/main-menu-view/main-menu-view.component'
import { ScrabbleViewComponent } from './views/scrabble-view/scrabble-view.component'
import { SetupViewComponent } from './views/setup-view/setup-view.component'

export const routes: Routes = [
  {path: "", component: MainMenuViewComponent},
  {path: "play", component: ScrabbleViewComponent},
  {path: "setup", component: SetupViewComponent}
];
