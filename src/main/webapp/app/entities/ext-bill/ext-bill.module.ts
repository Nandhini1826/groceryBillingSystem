import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceryBillingSystemSharedModule } from '../../shared';

import { ExtBillRoutingModule } from './ext-bill-routing.module';
import { ExtItemListComponent } from './ext-item-list/ext-item-list.component';
import { ExtReportComponent } from './ext-report/ext-report.component';
import { ExtBillGeneratorComponent } from './ext-bill-generator/ext-bill-generator.component';
import { ExtBillResolvePagingParams } from './';
import { ExtBillService } from './ext-bill.service';

@NgModule({
  imports: [
    CommonModule,
    GroceryBillingSystemSharedModule,
    ExtBillRoutingModule
  ],
  declarations: [ExtItemListComponent, ExtReportComponent, ExtBillGeneratorComponent],
  providers: [ExtBillService, ExtBillResolvePagingParams],
})
export class ExtBillModule { }
