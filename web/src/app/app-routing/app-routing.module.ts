import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './../auth/login/login.component';
import { LoginFamilyComponent } from '../auth/login-family/login-family.component';
import { NewuserComponent } from '../auth/newuser/newuser.component';
import { NewfamilyComponent } from '../auth/newfamily/newfamily.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'login-family', component: LoginFamilyComponent },
      { path: 'newuser', component: NewuserComponent },
      { path: 'newfamily', component: NewfamilyComponent },
    ])
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
