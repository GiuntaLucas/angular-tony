import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../../features/login/login-form/login-form.component';
import { Credential } from '../../interfaces/Credential';
import { AuthService } from '../../services/auth.service';
import { catchError, of, skipWhile } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';

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
  #toast = inject(ToastService);
  handleLogin(cred: Credential) {
    this.#authService.login(cred).subscribe(res => {
      if (res.success) {
        this.#toast.toast.set([{ message: 'Logged with success!', severity: 'SUCCESS' }]);
        this.#router.navigateByUrl('/links');
      } else {
        this.#toast.toast.set([{ message: 'Invalid credentials!', severity: 'ERROR' }]);
      }
    })
  }
}
