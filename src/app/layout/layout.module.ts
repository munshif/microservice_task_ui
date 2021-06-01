import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { HomeService } from './home/home.service';
import { FormsModule } from '@angular/forms';
import { PolicyService } from './home/policy.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutingModule),
    FormsModule
  ],
  providers: [HomeService, PolicyService],
  bootstrap: [LayoutComponent],
})
export class LayoutModule { }
