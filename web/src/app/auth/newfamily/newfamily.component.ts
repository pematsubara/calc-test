import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newfamily',
  templateUrl: './newfamily.component.html',
  styleUrls: ['./newfamily.component.css']
})
export class NewfamilyComponent implements OnInit {

  f: FormGroup;

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
    this.auth.createFamily(this.f.value).subscribe(
      (resp) => {
        this.auth.loginFamily(this.f.value).subscribe(
          (resp2) => {
            const user = { 'family' : this.auth.getFamily().id };
            this.auth.updateFamily(JSON.stringify(user));
            this.router.navigate(['sadmin/profile']);
          }
        );
      });
  }
}
