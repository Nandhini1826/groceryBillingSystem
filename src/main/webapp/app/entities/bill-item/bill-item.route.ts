import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BillItemComponent } from './bill-item.component';
import { BillItemDetailComponent } from './bill-item-detail.component';
import { BillItemPopupComponent } from './bill-item-dialog.component';
import { BillItemDeletePopupComponent } from './bill-item-delete-dialog.component';

export const billItemRoute: Routes = [
    {
        path: 'bill-item',
        component: BillItemComponent,
        data: {
            authorities: [],
            pageTitle: 'groceryBillingSystemApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bill-item/:id',
        component: BillItemDetailComponent,
        data: {
            authorities: [],
            pageTitle: 'groceryBillingSystemApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billItemPopupRoute: Routes = [
    {
        path: 'bill-item-new',
        component: BillItemPopupComponent,
        data: {
            authorities: [],
            pageTitle: 'groceryBillingSystemApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-item/:id/edit',
        component: BillItemPopupComponent,
        data: {
            authorities: [],
            pageTitle: 'groceryBillingSystemApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-item/:id/delete',
        component: BillItemDeletePopupComponent,
        data: {
            authorities: [],
            pageTitle: 'groceryBillingSystemApp.billItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
