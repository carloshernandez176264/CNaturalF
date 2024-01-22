import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null,[Validators.required],[Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  tooglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit():void {
    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username,password).subscribe(
      (res: any) => {
        this.snackBar.open(' Te Has logeado Correctamente', 'Close', { duration: 5000 });
        this.router.navigate(['/']);
      },
      (err: any) => {
        this.snackBar.open('No te puedes logear, intenta nuevamente', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    )
  }

}
