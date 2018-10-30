import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NadminComponent } from '../nadmin.component';
import { AuthGuard } from '../../guards/auth.guard';
import { TasksComponent } from '../tasks/tasks.component';
import { LogsComponent } from '../logs/logs.component';
import { ProfileComponent } from '../profile/profile.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'nadmin',
        component: NadminComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
          },
          { path: 'logs', component: LogsComponent },
          { path: 'tasks', component: TasksComponent },
          { path: 'profile', component: ProfileComponent },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class NadminRoutingModule { }

