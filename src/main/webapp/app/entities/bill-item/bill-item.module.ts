import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GroceryBillingSystemSharedModule } from '../../shared';
import {
    BillItemService,
    BillItemPopupService,
    BillItemComponent,
    BillItemDetailComponent,
    BillItemDialogComponent,
    BillItemPopupComponent,
    BillItemDeletePopupComponent,
    BillItemDeleteDialogComponent,
    billItemRoute,
    billItemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...billItemRoute,
    ...billItemPopupRoute,
];

@NgModule({
    imports: [
        GroceryBillingSystemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BillItemComponent,
        BillItemDetailComponent,
        BillItemDialogComponent,
        BillItemDeleteDialogComponent,
        BillItemPopupComponent,
        BillItemDeletePopupComponent,
    ],
    entryComponents: [
        BillItemComponent,
        BillItemDialogComponent,
        BillItemPopupComponent,
        BillItemDeleteDialogComponent,
        BillItemDeletePopupComponent,
    ],
    providers: [
        BillItemService,
        BillItemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GroceryBillingSystemBillItemModule {}
