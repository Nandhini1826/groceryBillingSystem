import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillItem } from './bill-item.model';
import { BillItemService } from './bill-item.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-bill-item',
    templateUrl: './bill-item.component.html'
})
export class BillItemComponent implements OnInit, OnDestroy {
billItems: BillItem[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private billItemService: BillItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.billItemService.query().subscribe(
            (res: HttpResponse<BillItem[]>) => {
                this.billItems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBillItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BillItem) {
        return item.id;
    }
    registerChangeInBillItems() {
        this.eventSubscriber = this.eventManager.subscribe('billItemListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
