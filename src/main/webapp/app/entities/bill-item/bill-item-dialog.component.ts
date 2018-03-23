import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs/Subscription';
// import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExtBillService } from '../ext-bill/ext-bill.service';
import { BillItem } from './bill-item.model';
import { BillItemPopupService } from './bill-item-popup.service';
// import { BillItemService } from './bill-item.service';
import { Item } from '../item';
import { Bill } from '../bill';

@Component({
    selector: 'jhi-bill-item-dialog',
    templateUrl: './bill-item-dialog.component.html'
})
export class BillItemDialogComponent implements OnInit {

    billId: number;

    billItem: BillItem;
    isSaving: boolean;

    items: Item[];

    // bills: Bill[];

    // private subscription: Subscription;

    constructor(
        public activeModal: NgbActiveModal,
        // private jhiAlertService: JhiAlertService,
        // private billItemService: BillItemService,
        // private itemService: ItemService,
        // private billService: BillService,
        private eventManager: JhiEventManager,
        // private route: ActivatedRoute,
        private extBillService: ExtBillService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;

        // this.subscription = this.route.params.subscribe((params) => {
        //     this.billId = params['bill-id'];
        //   });

        this.billId = this.extBillService.getCurrentBillId();

        this.loadItems();

        // this.itemService.query()
        //     .subscribe((res: HttpResponse<Item[]>) => { this.items = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        // this.billService.query()
        //     .subscribe((res: HttpResponse<Bill[]>) => { this.bills = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    loadItems() {
        this.items = this.extBillService.fetchItems();
    }

    // if an item is selected in the drop down, populate the price per unit
    onItemChange(item: Item) {
        // console.log('trial ' + JSON.stringify(item));
        this.billItem.pricePerUnit = (item === null) ? 0 : item.price;

        this.billItem.quantityPurchased = 0;
        this.billItem.amount = 0;
    }

    // if quantity is entered, calculate the amount
    onKey(quantity: number) {
        this.billItem.amount = this.billItem != null && this.billItem.item != null && this.billItem.item['quantity'] !== 0 ?
                Math.round((this.billItem.pricePerUnit / this.billItem.item['quantity']) * quantity) :
                0;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        // if (this.billItem.id !== undefined) {
        //     this.subscribeToSaveResponse(
        //         this.billItemService.update(this.billItem));
        // } else {
        //     this.subscribeToSaveResponse(
        //         this.billItemService.create(this.billItem));
        // }

        const result: BillItem = this.extBillService.storeBillItem(this.billId, this.billItem);
        this.onSaveSuccess(result);
    }

    // private subscribeToSaveResponse(result: Observable<HttpResponse<BillItem>>) {
    //     result.subscribe((res: HttpResponse<BillItem>) =>
    //         this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    // }

    private onSaveSuccess(result: BillItem) {
        this.eventManager.broadcast({ name: 'billItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    // private onSaveError() {
    //     this.isSaving = false;
    // }

    // private onError(error: any) {
    //     this.jhiAlertService.error(error.message, null, null);
    // }

    trackItemById(index: number, item: Item) {
        return item.id;
    }

    trackBillById(index: number, item: Bill) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bill-item-popup',
    template: ''
})
export class BillItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billItemPopupService: BillItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.billItemPopupService
                    .open(BillItemDialogComponent as Component, params['id']);
            } else {
                this.billItemPopupService
                    .open(BillItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
