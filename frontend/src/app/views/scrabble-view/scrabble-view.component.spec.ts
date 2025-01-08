import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrabbleViewComponent } from './scrabble-view.component';

describe('ScrabbleViewComponent', () => {
  let component: ScrabbleViewComponent;
  let fixture: ComponentFixture<ScrabbleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrabbleViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrabbleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
