import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credential } from '../../../interfaces/Credential';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  #fb = inject(FormBuilder);
  login = output<Credential>()

  form = this.#fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(8), Validators.required]]
  })
  handleLogin() {
    this.login.emit(this.form.getRawValue());
  }
}
