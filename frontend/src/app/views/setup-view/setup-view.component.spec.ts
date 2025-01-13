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
import { globalErrorHandler } from '../../error-handler.interceptor';
import { ScrabbleService } from '../../services/scrabble.service';
import { SetupViewComponent } from './setup-view.component';

describe('SetupViewComponent', () => {
  let setupViewComponent: SetupViewComponent;
  let fixture: ComponentFixture<SetupViewComponent>;
  let setupViewDOM: HTMLElement;
  let inputField: HTMLInputElement;
  let submitButton: HTMLButtonElement | null;
  let httpTesting: HttpTestingController;

  function submitForm() {
    inputField.value = 'test';
    inputField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    submitButton?.click();
    fixture.detectChanges();
  }

  function resetState() {
    setupViewComponent.word = '';
    setupViewComponent.errorMsg = '';
    setupViewComponent.successMsg = '';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupViewComponent],
      providers: [
        ScrabbleService,
        provideHttpClient(withInterceptors([globalErrorHandler])),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupViewComponent);
    setupViewComponent = fixture.componentInstance;
    setupViewDOM = fixture.nativeElement;
    inputField = setupViewDOM.querySelector('input[name="word"]')!;
    submitButton = setupViewDOM.querySelector('.input-btn');

    resetState();
    httpTesting = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(setupViewComponent).toBeTruthy();
  });

  describe('successful word creation flow', () => {
    it('should display successful request message', () => {
      submitForm();
      const req = httpTesting.expectOne({
        method: 'POST',
        url: '/api/scrabble/word',
      });

      req.flush({});
      fixture.detectChanges();

      expect(setupViewComponent.successMsg).toContain('');
      const successfulMsg = setupViewDOM.querySelector('.success');
      expect(successfulMsg?.textContent).toContain(
        'Word was added to dictionary'
      );
    });
  });

  describe('failed word creation flow', () => {
    it('should display errorMsg when special symbol is entered', () => {
      inputField.value = '!test';
      inputField.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const validationMsg = setupViewDOM.querySelector('.error-msg');
      expect(validationMsg?.textContent).toContain(
        'Word may only contain letters'
      );
    });

    it('should display errorMsg when a known word is submitted', () => {
      const errorResponse = new HttpErrorResponse({
        error: {
          error: 'Duplicate',
          message: 'test 409 error',
          status: 409,
        },
      });
      submitForm();
      const req = httpTesting.expectOne({
        method: 'POST',
        url: '/api/scrabble/word',
      });

      req.flush(errorResponse.error, errorResponse);
      fixture.detectChanges();
      expect(setupViewComponent.errorMsg).toBe('test 409 error');
      const errorMsg = setupViewDOM.querySelector('.error-msg');
      expect(errorMsg).not.toEqual(null);
      expect(errorMsg?.textContent).toContain('test 409 error');
    });
  });
});
