import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ScrabbleService {

  private readonly baseUrl = '/api/scrabble'

  constructor( private http: HttpClient ) {}

  calculatePoints(word: string): Observable<number> {
    const url = this.baseUrl + '/calculate-score';
    return this.http.post<number>(url, { word });
  }

  addNewWord(word: string): Observable<void> {
    const url = this.baseUrl + '/word';
    return this.http.post<void>(url, { word });
  }
}
