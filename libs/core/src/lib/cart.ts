import * as firebase from 'firebase/app';

import { collectionData, docData } from 'rxfire/firestore';
import { BehaviorSubject } from 'rxjs';

export interface CartData {
  items: Array<any>;
  quantity: Number;
  total: Number;
}
export const Cart = new class {
  items: Array<any> = [];
  quantity: Number = 0;
  total: Number = 0;

  public data$: BehaviorSubject<CartData>;

  constructor() {
    this.data$ = new BehaviorSubject(this.getData());
  }

  getData(): CartData {
    return {
      items: this.items,
      quantity: this.quantity,
      total: this.total
    };
  }

  add(item) {}

  remove(item) {}
}();
