import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginFamilyComponent } from './login-family/login-family.component';
import { NewuserComponent } from './newuser/newuser.component';
import { NewfamilyComponent } from './newfamily/newfamily.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    LoginFamilyComponent,
    LoginComponent,
    ProfileComponent,
    NewuserComponent,
    NewfamilyComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
