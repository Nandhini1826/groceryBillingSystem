import { Component, OnInit } from '@angular/core';

import { Bill } from '../../bill/bill.model';
import { ExtBillService } from '../ext-bill.service';
@Component({
  selector: 'jhi-ext-report',
  templateUrl: './ext-report.component.html',
  styles: []
})
export class ExtReportComponent implements OnInit {

  bills: Bill[];

  constructor(
    private extBillService: ExtBillService
  ) { }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.bills = this.extBillService.fetchSortedBills();
  }

  trackId(index: number, item: Bill) {
    return item.id;
  }

  eraseAllData() {
    this.extBillService.eraseAllData();
    this.loadAll();
  }
}
