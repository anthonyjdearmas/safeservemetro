import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursematerialComponent } from './coursecontent/coursematerial.component';


const routes: Routes = [{ path: '', component: CoursematerialComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CoursematerialRoutingModule { }
