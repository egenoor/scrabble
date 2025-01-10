import { ComponentFixture, TestBed } from '@angular/core/testing'

import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { of } from 'rxjs'
import { ScrabbleService } from '../../services/scrabble.service'
import { GameInputComponent } from './game-input.component'

describe('GameInputComponent', () => {
  let component: GameInputComponent;
  let fixture: ComponentFixture<GameInputComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameInputComponent],
      providers: [ScrabbleService, provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;

    const scrabbleService = TestBed.inject(ScrabbleService);
    TestBed.inject(HttpTestingController);

    spyOn(scrabbleService, 'calculatePoints').and.returnValue(of(9));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
