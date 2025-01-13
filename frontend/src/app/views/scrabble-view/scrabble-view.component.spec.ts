import {
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { globalErrorHandler } from '../../error-handler.interceptor';
import { ScrabbleService } from '../../services/scrabble.service';
import { ScrabbleViewComponent } from './scrabble-view.component';

describe('ScrabbleViewComponent', () => {
  let scrabbleViewComponent: ScrabbleViewComponent;
  let fixture: ComponentFixture<ScrabbleViewComponent>;
  let scrabbleViewDOM: HTMLElement;
  let submitButton: HTMLButtonElement | null;
  let inputField: HTMLInputElement;
  let scrabbleService: ScrabbleService;
  let httpTesting: HttpTestingController;

  function submitForm() {
    inputField.value = 'test';
    inputField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    submitButton?.click();
    fixture.detectChanges();
  }

  function resetState() {
    scrabbleViewComponent.points = 0;
    scrabbleViewComponent.word = '';
    scrabbleViewComponent.errorMsg = '';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrabbleViewComponent],
      providers: [
        ScrabbleService,
        provideHttpClient(withInterceptors([globalErrorHandler])),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrabbleViewComponent);
    scrabbleViewComponent = fixture.componentInstance;
    scrabbleViewDOM = fixture.nativeElement;
    inputField = scrabbleViewDOM.querySelector('input[name="word"]')!;
    submitButton = scrabbleViewDOM.querySelector('.input-btn');

    resetState();
    fixture.detectChanges();
    scrabbleService = TestBed.inject(ScrabbleService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(scrabbleViewComponent).toBeTruthy();
  });

  describe('successful calculation flow', () => {
    it('should display points when points > 0', () => {
      spyOn(scrabbleService, 'calculatePoints').and.returnValue(of(9));
      submitForm();

      const points = scrabbleViewDOM.querySelector('.points');
      expect(points).toBeTruthy();
      expect(points?.textContent).toContain('Points: 9');
    });
  });

  describe('failed calculation flow', () => {
    it('should display errorMsg when an unknown word is submitted', () => {
      const errorResponse = new HttpErrorResponse({
        error: {
          error: 'Not found',
          message: 'test 404 error',
          status: 404,
        },
      });
      submitForm();
      const req = httpTesting.expectOne({
        method: 'POST',
        url: '/api/scrabble/calculate-score',
      });

      req.flush(errorResponse.error, errorResponse);
      fixture.detectChanges();
      expect(scrabbleViewComponent.errorMsg).toBe('test 404 error');
      const errorMsg = scrabbleViewDOM.querySelector('.error-msg');
      expect(errorMsg).not.toEqual(null);
      expect(errorMsg?.textContent).toContain('test 404 error');
    });

    it('should throw default error when something unexpected happens', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'Oops',
      });
      submitForm();
      const req = httpTesting.expectOne({
        method: 'POST',
        url: '/api/scrabble/calculate-score',
      });

      req.flush(errorResponse.error, errorResponse);
      fixture.detectChanges();
      expect(scrabbleViewComponent.errorMsg).toBe('Something went wrong');
      const errorMsg = scrabbleViewDOM.querySelector('.error-msg');
      expect(errorMsg).not.toEqual(null);
      expect(errorMsg?.textContent).toContain('Something went wrong');
    });
  });
});
