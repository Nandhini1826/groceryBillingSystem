import { Injectable } from '@angular/core';
import { isUndefined } from 'util';
import { JhiAlertService } from 'ng-jhipster';

import { Item } from '../item/item.model';
import { Bill } from '../bill/bill.model';
import { BillItem } from '../bill-item/bill-item.model';

@Injectable()
export class ExtBillService {

  currentBillId: number;
  constructor(
    private jhiAlertService: JhiAlertService
  ) { }

  getCurrentBillId(): number {
    return this.currentBillId;
  }

  setCurrentBillId(billId: number) {
    this.currentBillId = billId;
  }

  /* To fetch the items from local storage,
  if the items are not available in local storage then
  it calls a function to fill into local storage */
  fetchItems() {
    console.log('in fetch');
    if (isUndefined(localStorage.getItem('items')) ||
      localStorage.getItem('items') === null
    ) {
      this.fillItems();
    }
  const itemsStr = localStorage.getItem('items');
    // console.log('in fetch str = ' + itemsStr);
    return JSON.parse(itemsStr);
  }

  fillItems() {
    let index: number;
    const names = ['mustard', 'ginger', 'garlic', 'sugar', 'ravai',
                   'cardamom', 'wheat', 'jaggery', 'gramflour', 'redgram'];
    const prices = [75.00, 50.00, 60.00, 38.00, 50.00,
                    1100.00, 40.00, 50.00, 70.00, 70.00];

    const items = [];
    for (index = 0; index < names.length; index++) {
          const item = new Item(index + 1, names[index], prices[index], 1000, null);
          // console.log(item.name);
          items.push(item);
          }
    // console.log('in fill');
    localStorage.setItem('items', JSON.stringify(items));
  }

  // get the bill from ls
  // if billId is zero, new bill is created
  fetchBill(billId: number): Bill {
    if (isUndefined(billId) || billId === 0) {
      return this.composeNewBill();
    }

    return this.fetchBillFromLs(billId);
  }

  // create a new bill
  composeNewBill(): Bill {
    const id = this.largestBillId() + 1;
    const bill = new Bill(id, new Date(), 0, []);

    this.storeBill(bill);

    return bill;
  }

  // return the largest bill id
  // if bills array is empty, return 0
  largestBillId(): number {
    const bills = this.fetchSortedBills();
    if (bills === null || bills.length <= 0) {
      return 0;
    }

    return bills[0].id;
  }

  // find bill by scanning ls
  // if not found, null is returned
  fetchBillFromLs(billId: number): Bill {
    const bills = this.fetchSortedBills();
    for (let index = 0; index < bills.length; index++) {
      const bill = bills[index];
      console.log('fetchBillFromLs ' + bill.id + ' ' + billId);
      if (bill.id === billId) {
        return bill;
      }

    }

    return null;
  }

  // find bill position by scanning ls
  // if not found, -1 is returned
  fetchBillPosition(billId: number): number {
    const bills = this.fetchSortedBills();
    for (let index = 0; index < bills.length; index++) {
      const bill = bills[index];
      if (bill.id === billId) {
        return index;
      }

    }

    return -1;
  }

  // store a single bill into the ls
  storeBill(bill: Bill) {
    const bills = this.fetchSortedBills();
    bills.push(bill);
    // console.log('storeBill ' + JSON.stringify(bills));
    localStorage.setItem('bills', JSON.stringify(bills));
  }

  // add a single billItem to bill
  storeBillItem(billId: number, billItem: BillItem): BillItem {
    const pos: number = this.fetchBillPosition(billId);

    if (pos < 0) {
      this.jhiAlertService.error('Unable to find bill with id ' + billId);
      return null;
    }

    const bills = this.fetchSortedBills();
    const bill: Bill = bills[pos];

    if (bill === null) {
      this.jhiAlertService.error('bill with id ' + billId + ' not found');
      return null;
    }

    // remove this object from the array and add it later.
    bills.splice(pos, 1);

    bill.billItems.push(billItem);

    console.log('storeBillItem ' + JSON.stringify(bill));

    bill.total = 0;
    bill.billItems.forEach((bi) => {
      bill.total += bi['amount'];
    });

    // this.storeBill(bill);
    bills.push(bill);
    localStorage.setItem('bills', JSON.stringify(bills));

    return billItem;
  }

  // return the bills in desc order of id from ls
  // if ls doesn't have the bills, empty array is created
  fetchSortedBills(): Bill[] {
    if (isUndefined(localStorage.getItem('bills')) ||
      localStorage.getItem('bills') === null
    ) {
      localStorage.setItem('bills', JSON.stringify([]));
    }

    const bills: Bill[] = JSON.parse(localStorage.getItem('bills'));

    return bills.sort((a, b) => {
      return b.id - a.id;
    });
  }

  eraseAllData() {
    localStorage.clear();
  }
}
