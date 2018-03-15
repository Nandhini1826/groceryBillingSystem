import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bill } from './bill.model';
import { BillService } from './bill.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-bill',
    templateUrl: './bill.component.html'
})
export class BillComponent implements OnInit, OnDestroy {
bills: Bill[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private billService: BillService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.billService.query().subscribe(
            (res: HttpResponse<Bill[]>) => {
                this.bills = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBills();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Bill) {
        return item.id;
    }
    registerChangeInBills() {
        this.eventSubscriber = this.eventManager.subscribe('billListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
