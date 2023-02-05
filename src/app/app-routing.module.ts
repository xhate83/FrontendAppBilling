import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BillingsComponent } from './pages/billings/billings.component';
import { DxDataGridModule, DxValidatorModule, DxNumberBoxModule , DxFormModule, DxButtonModule, DxPopupModule, DxListModule, DxTemplateModule, DxScrollViewModule, DxSelectBoxModule } from 'devextreme-angular';

const routes: Routes = [
  {
    path: 'billings',
    component: BillingsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxValidatorModule, CommonModule, DxNumberBoxModule,DxTemplateModule, DxListModule, DxDataGridModule, DxFormModule, DxButtonModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    BillingsComponent
  ]
})
export class AppRoutingModule { }
