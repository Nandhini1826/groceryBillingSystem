import { Injectable } from '@angular/core';
import { isUndefined } from 'util';
import { Item } from '../item/item.model';

@Injectable()
export class ExtBillService {
constructor() { }
  /* To fetch the items from local storage, 
  if the items are not available in local storage then 
  it calls a function to fill into local storage */
  fetchItems() {
    console.log('in fetch');
    if(isUndefined(localStorage.getItem("items")) ||
      localStorage.getItem("items") === null
    ) {
      this.fillItems();
    } 
  const itemsStr = localStorage.getItem("items");
    // console.log('in fetch str = ' + itemsStr);
    return JSON.parse(itemsStr);
  }

  fillItems() {
    let index:number;
    const names = ['mustard','ginger','garlic','sugar','ravai','cardamom','wheat',
                'jaggery','gramflour','redgram'];
    const prices = [75.00,50.00,60.00,38.00,50.00,1100.00,40.00,50.00,70.00,70.00];
    
    const items = [];
    for(index=0;index<names.length;index++) {
          const item= new Item(index + 1, names[index], prices[index], 1000, null);
          console.log(item.name)
          items.push(item);
          }
    console.log('in fill');
    localStorage.setItem("items", JSON.stringify(items));
  }
}
