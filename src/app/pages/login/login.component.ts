import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../../features/login/login-form/login-form.component';
import { Credential } from '../../interfaces/Credential';
import { AuthService } from '../../services/auth.service';
import { catchError, of, skipWhile } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  #authService = inject(AuthService);
  #router = inject(Router);
  handleLogin(cred: Credential) {
    this.#authService.login(cred).pipe(
      catchError(err => {
        console.error(err)
        return of(cred)
      }),
    ).subscribe(() => {
      this.#router.navigateByUrl('/links');
    })
  }
}
