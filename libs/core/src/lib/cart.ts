import * as firebase from 'firebase/app';

import { collectionData, docData } from 'rxfire/firestore';
import { BehaviorSubject } from 'rxjs';

import { IProduct } from '@shop-themes/core';

export interface ICart {
  items: Array<any>;
  quantity: Number;
  total: Number;
}

export interface ICartItem {
  quantity: Number;
  price: Number;
  product: IProduct;
}
export const Cart = new class {
  items: Array<any> = [];
  quantity: Number = 0;
  total: Number = 0;

  public data$: BehaviorSubject<ICart>;

  constructor() {
    this.data$ = new BehaviorSubject(this.getData());
  }

  getData(): ICart {
    return {
      items: this.items,
      quantity: this.quantity,
      total: this.total
    };
  }

  add(item: ICartItem) {}

  remove(item: ICartItem) {}
}();
