import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NadminRoutingModule } from './nadmin-routing/nadmin-routing.module';
import { NadminComponent } from './nadmin.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProfileComponent } from './profile/profile.component';
import { LogsComponent } from './logs/logs.component';

@NgModule({
  imports: [
    CommonModule,
    NadminRoutingModule
  ],
  declarations: [
    NadminComponent,
    TasksComponent,
    ProfileComponent,
    LogsComponent
  ],
  exports: [NadminComponent]
})
export class NadminModule { }
