import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, pipe, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  #http: HttpClient = inject(HttpClient);
  #url: string = `${environment.apiUrl}`;
  #router: Router = inject(Router);
  #store = inject(AuthStore);
  #pipe = pipe(
    tap((response) => {
      // this.#router.navigate(['/']);
      this.#store.setLogin(response);
    }),
    map((result) => {
      return { result, error: null };
    }),
    catchError((error) => {
      return of({ error, result: null });
    }),
  );

  postLogin$(credentials: any) {
    return this.#http.post<any>(`${this.#url}/login`, credentials).pipe(this.#pipe);
  }
  postRegister$(credentials: any): Observable<any> {
    return this.#http.post<any>(`${this.#url}/register`, credentials).pipe(this.#pipe);
  }
}
