import { HttpClient, HttpErrorResponse, provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { of } from 'rxjs'
import { ScrabbleService } from '../../services/scrabble.service'
import { ScrabbleViewComponent } from './scrabble-view.component'



describe('ScrabbleViewComponent', () => {
  @Component({selector: 'app-back-button', template: ''})
  class BackButtonStubComponent {}
  
  let scrabbleViewComponent: ScrabbleViewComponent;
  let fixture: ComponentFixture<ScrabbleViewComponent>;
  let scrabbleViewDOM: HTMLElement;
  let submitButton: HTMLButtonElement | null;
  let inputField: HTMLInputElement;
  let scrabbleService: ScrabbleService;

  function submitForm () {
    inputField.value = 'test';
    inputField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    submitButton?.click();
    fixture.detectChanges();
  }

  function resetState () {
    scrabbleViewComponent.points = 0;
    scrabbleViewComponent.word = "";
    scrabbleViewComponent.errorMsg = "";
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrabbleViewComponent, BackButtonStubComponent],
      providers: [ScrabbleService, provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ScrabbleViewComponent);
    scrabbleViewComponent = fixture.componentInstance;
    scrabbleViewDOM = fixture.nativeElement;
    inputField = scrabbleViewDOM.querySelector('input[name="word"]')!;
    submitButton = scrabbleViewDOM.querySelector('.input-btn');
    resetState();
    fixture.detectChanges();
    scrabbleService = TestBed.inject(ScrabbleService);
    TestBed.inject(HttpTestingController);

    
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
      expect(points?.textContent).toContain('Points: 9')
    });

    it('should sum up next word points to current score', () => {
      spyOn(scrabbleService, 'calculatePoints').and.returnValues(of(9), of(5));
      submitForm();
      submitForm();
      const points = scrabbleViewDOM.querySelector('.points');
      expect(points).toBeTruthy();
      expect(points?.textContent).toContain('Points: 14')
    })
  })

  describe('failed calculation flow', () => {
    xit('should display errorMsg when an unknown word is submitted', () => {
      const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['post']);
      scrabbleService = new ScrabbleService(httpClientSpy)
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not Found',
      });
      httpClientSpy.post.and.rejectWith();
  
      submitForm();
      const errorMsg = scrabbleViewDOM.querySelector('.error-msg');
      expect(errorMsg?.textContent).toContain('Error')
    })
  })

});