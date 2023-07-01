import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoursematerialRoutingModule } from './coursematerial-routing.module';
import { CoursematerialComponent } from './coursecontent/coursematerial.component';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AccountoverviewComponent } from './accountoverview/accountoverview.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { InteractiveQuizComponent } from './interactive-quiz/interactive-quiz.component';
// import angular material tab
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  imports: [
    CommonModule,
    CoursematerialRoutingModule,
    BsDropdownModule.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      responsive: true
    }),
    ReactiveFormsModule,
    MatTabsModule
  ],
  exports: [
    BsDropdownModule,
    AccountoverviewComponent,
    InteractiveQuizComponent
  ],
  providers: [
    BsDropdownConfig
  ],
  declarations: [
    AccountoverviewComponent,
    CoursematerialComponent,
    InteractiveQuizComponent
  ]
})
export class CoursematerialModule { }
