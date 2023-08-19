import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransUnitComponent } from './pages/trans-unit/trans-unit.component'

const routes: Routes = [
  { path: 'trans-units', component: TransUnitComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
