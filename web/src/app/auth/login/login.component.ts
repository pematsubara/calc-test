import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  f: FormGroup;
  errorCredentials = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.f = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
    localStorage.clear();
  }

  onSubmit() {
    this.authService.login(this.f.value).subscribe(
      (resp) => {
        this.authService.updateTasks();
        this.authService.updateLogs();
        if (this.authService.getFamily().id === 1 ) {
          this.router.navigate(['login-family']);
        } else {
          if (this.authService.getFamily().admin === this.authService.getUser().id) {
            this.router.navigate(['sadmin']);
          } else {
            this.router.navigate(['nadmin']);
          }
        }
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = true;
        }
      }
    );
  }
}
