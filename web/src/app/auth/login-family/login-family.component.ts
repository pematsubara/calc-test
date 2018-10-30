import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-login-family',
  templateUrl: './login-family.component.html',
  styleUrls: ['./login-family.component.css']
})
export class LoginFamilyComponent implements OnInit {

  f: FormGroup;
  errorCredentials = false;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.f = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.auth.loginFamily(this.f.value).subscribe(
      (resp) => {
        const user = { 'family' : this.auth.getFamily().id };
        this.auth.updateFamily(JSON.stringify(user));
        if (this.auth.getFamily().admin === this.auth.getUser().id) {
          this.router.navigate(['sadmin']);
        } else {
          this.router.navigate(['nadmin']);
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
