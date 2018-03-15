import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GroceryBillingSystemSharedModule } from '../../shared';
import {
    BillService,
    BillPopupService,
    BillComponent,
    BillDetailComponent,
    BillDialogComponent,
    BillPopupComponent,
    BillDeletePopupComponent,
    BillDeleteDialogComponent,
    billRoute,
    billPopupRoute,
} from './';

const ENTITY_STATES = [
    ...billRoute,
    ...billPopupRoute,
];

@NgModule({
    imports: [
        GroceryBillingSystemSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BillComponent,
        BillDetailComponent,
        BillDialogComponent,
        BillDeleteDialogComponent,
        BillPopupComponent,
        BillDeletePopupComponent,
    ],
    entryComponents: [
        BillComponent,
        BillDialogComponent,
        BillPopupComponent,
        BillDeleteDialogComponent,
        BillDeletePopupComponent,
    ],
    providers: [
        BillService,
        BillPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GroceryBillingSystemBillModule {}
