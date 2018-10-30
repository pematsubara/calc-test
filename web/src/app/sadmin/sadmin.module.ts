import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SadminRoutingModule } from './sadmin-routing/sadmin-routing.module';
import { SadminComponent } from './sadmin.component';
import { ScoreComponent } from './score/score.component';

@NgModule({
  imports: [
    CommonModule,
    SadminRoutingModule,
  ],
  declarations: [
    SadminComponent,
    ScoreComponent,
  ],
  exports: [SadminComponent]
})
export class SadminModule { }
