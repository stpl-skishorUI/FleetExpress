import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { TrackingComponent } from './tracking.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    TrackingComponent,
  ],
  imports: [
    CommonModule,
    TrackingRoutingModule,
    MaterialModule,
    NgbModule
  ],
})
export class TrackingModule { }
