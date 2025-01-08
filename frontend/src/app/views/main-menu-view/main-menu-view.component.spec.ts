import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuViewComponent } from './main-menu-view.component';

describe('MainMenuViewComponent', () => {
  let component: MainMenuViewComponent;
  let fixture: ComponentFixture<MainMenuViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenuViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
