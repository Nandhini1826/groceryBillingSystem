import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BillComponent } from './bill.component';
import { BillDetailComponent } from './bill-detail.component';
import { BillPopupComponent } from './bill-dialog.component';
import { BillDeletePopupComponent } from './bill-delete-dialog.component';

export const billRoute: Routes = [
    {
        path: 'bill',
        component: BillComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'groceryBillingSystemApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bill/:id',
        component: BillDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'groceryBillingSystemApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billPopupRoute: Routes = [
    {
        path: 'bill-new',
        component: BillPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'groceryBillingSystemApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill/:id/edit',
        component: BillPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'groceryBillingSystemApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill/:id/delete',
        component: BillDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'groceryBillingSystemApp.bill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
