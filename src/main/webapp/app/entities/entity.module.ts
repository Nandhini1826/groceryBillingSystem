import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GroceryBillingSystemItemModule } from './item/item.module';
import { GroceryBillingSystemBillItemModule } from './bill-item/bill-item.module';
import { GroceryBillingSystemBillModule } from './bill/bill.module';
import { ExtBillModule } from './ext-bill/ext-bill.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GroceryBillingSystemItemModule,
        GroceryBillingSystemBillItemModule,
        GroceryBillingSystemBillModule,
        ExtBillModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GroceryBillingSystemEntityModule {}
