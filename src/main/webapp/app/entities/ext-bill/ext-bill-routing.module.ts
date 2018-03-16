import { NgModule, Injectable } from '@angular/core';
import { Resolve, Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ExtItemListComponent } from './ext-item-list/ext-item-list.component';
import { ExtReportComponent } from './ext-report/ext-report.component';
import { ExtBillGeneratorComponent } from './ext-bill-generator/ext-bill-generator.component';

@Injectable()
export class ExtBillResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

const routes: Routes = [

  {
    path: 'ext-report',
    component: ExtReportComponent,
    resolve: {
        'pagingParams': ExtBillResolvePagingParams
    },
    data: {
        authorities: [],
        pageTitle: 'Grocery - report'
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'ext-item-list',
    component: ExtItemListComponent,
    resolve: {
        'pagingParams': ExtBillResolvePagingParams
    },
    data: {
        authorities: [],
        pageTitle: 'Grocery - list of products'
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'ext-bill-generator',
    component: ExtBillGeneratorComponent,
    resolve: {
        'pagingParams': ExtBillResolvePagingParams
    },
    data: {
        authorities: [],
        pageTitle: 'Grocery - create bill'
    },
    canActivate: [UserRouteAccessService]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtBillRoutingModule { }
