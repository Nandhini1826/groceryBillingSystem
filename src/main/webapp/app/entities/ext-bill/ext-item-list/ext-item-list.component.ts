import { Component, OnInit, OnDestroy } from '@angular/core';
// import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Item } from '../../item/item.model';
// import { ItemService } from './item.service';
import { ExtBillService} from '../ext-bill.service';
import { Principal } from '../../../shared';

@Component({
  selector: 'jhi-ext-item-list',
  templateUrl: './ext-item-list.component.html',
  styles: []
})
export class ExtItemListComponent implements OnInit, OnDestroy {

  items: Item[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
        // private itemService: ItemService,
        private extBillService: ExtBillService,
        // private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
  ) { }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then((account) => {
        this.currentAccount = account;
    });
    this.registerChangeInItems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  loadAll() {
    this.items = this.extBillService.fetchItems();
  }

  trackId(index: number, item: Item) {
    return item.id;
  }

  registerChangeInItems() {
    this.eventSubscriber = this.eventManager.subscribe('itemListModification', (response) => this.loadAll());
  }

  // private onError(error) {
  //   this.jhiAlertService.error(error.message, null, null);
  // }

}
