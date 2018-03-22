import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bill } from '../../bill/bill.model';
import { BillItem } from '../../bill-item/bill-item.model';
import { ExtBillService } from '../ext-bill.service';

@Component({
  selector: 'jhi-ext-bill-generator',
  templateUrl: './ext-bill-generator.component.html',
  styles: []
})
export class ExtBillGeneratorComponent implements OnInit, OnDestroy {
  billId: number;
  bill: Bill;
  billItems: BillItem[];
  private subscription: Subscription;
  eventSubscriber: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventManager: JhiEventManager,
    private jhiAlertService: JhiAlertService,
    private extBillService: ExtBillService
  ) { }

  ngOnInit() {

    this.subscription = this.route.params.subscribe((params) => {
      this.billId = +params['id'];
    });

    this.loadAll();
    this.registerChangeInBillItems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  loadAll() {
    this.loadBill();
  }

  loadBill() {
    this.bill = this.extBillService.fetchBill(this.billId);
    console.log('loadBill ' + this.billId + ' ' + JSON.stringify(this.bill));

    if (this.bill === null) {
      this.jhiAlertService.error('Unable to load bill for id ' + this.billId);
      return;
    }

    this.billItems = this.bill.billItems;
    this.billId = this.bill.id;
    this.extBillService.setCurrentBillId(this.bill.id);
  }

  registerChangeInBillItems() {
    this.eventSubscriber = this.eventManager.subscribe('billItemListModification', (response) => this.loadAll());
  }

}
