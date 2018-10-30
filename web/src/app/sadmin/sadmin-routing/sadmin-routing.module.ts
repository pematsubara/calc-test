import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SadminComponent } from '../sadmin.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ScoreComponent } from '../score/score.component';
import { TasksComponent } from '../../nadmin/tasks/tasks.component';
import { LogsComponent } from '../../nadmin/logs/logs.component';
import { ProfileComponent } from '../../nadmin/profile/profile.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'sadmin',
        component: SadminComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
          },
          { path: 'logs', component: LogsComponent },
          { path: 'score', component: ScoreComponent },
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
export class SadminRoutingModule { }

