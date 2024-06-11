import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Credential } from '../interfaces/Credential';
import { tap } from 'rxjs';
import { BaseResponse } from '../interfaces/BaseResponse';
import { Auth } from '../interfaces/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient);

  login(cred: Credential) {
    // fetch('https://back.flyingpad.be/api/V1/Auth/Login', { method: 'POST', body: JSON.stringify(cred) })
    return this.#http.post<Auth>('https://back.flyingpad.be/api/V1/Auth/Login', cred).pipe(
      tap(res => {
        if (res.success) {
          this.setCurrentToken(res.token);
        }
      })
    );
  }

  getCurrentToken(): string | undefined {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.setCurrentToken(token);
    return token;
  }

  setCurrentToken(token: string) {
    localStorage.setItem('token', token);
  }
}
