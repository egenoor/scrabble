import { TestBed } from '@angular/core/testing';

import { ScrabbleService } from './scrabble.service';

describe('ScrabbleService', () => {
  let service: ScrabbleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrabbleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
