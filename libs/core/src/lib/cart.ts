import * as firebase from 'firebase/app';

import { collectionData, docData } from 'rxfire/firestore';
import { BehaviorSubject } from 'rxjs';

import { Auth, User } from './auth';
import { IProduct } from './shop';

export interface ICart {
  items: Array<any>;
  quantity: Number;
  total: Number;
}

export interface ICartItem {
  quantity: Number;
  price: Number;
  product: IProduct;
  $key: String;
}

export const EMPTY_CART = {
  items: [],
  quantity: 0,
  total: 0
};
export const Cart = new class {
  items: Array<any> = [];
  quantity: Number = 0;
  total: Number = 0;

  private readonly _cart = new BehaviorSubject<ICart>({
    items: this.items,
    quantity: this.quantity,
    total: this.total
  });

  bootstrap() {
    Auth.user$.subscribe((user: User) => {
      if (user) {
        this.data = user.cart;
      } else {
        this.data = EMPTY_CART;
      }
    });
  }

  // Expose the observable$ part of the _todos subject (read only stream)
  readonly data$ = this._cart.asObservable();

  // the getter will return the last value emitted in _todos subject
  get data(): ICart {
    return {
      items: this.items,
      quantity: this.quantity,
      total: this.total
    };
  }

  set data(val: ICart) {
    this.items = val.items;
    this.quantity = val.quantity;
    this.total = val.total;
    this._cart.next(val);
  }

  /**
   *
   * @param item
   */
  async add(item: ICartItem) {
    this.guard();
    this.items.push(item);
    this.quantity = this.computeQuantity(this.items);
    this.total = this.computeTotal(this.items);
    return await this.update(this.data);
  }

  /**
   *
   * @param item
   */
  async remove(item: ICartItem) {
    this.guard();
    this.items = this.items.filter(
      element => element.product.$key !== item.product.$key
    );
    this.quantity = this.computeQuantity(this.items);
    this.total = this.computeTotal(this.items);
    return await this.update(this.data);
  }

  private computeQuantity(items) {
    return items.length;
  }

  private computeTotal(items: Array<ICartItem>): Number {
    let total: number = 0;

    items.forEach((item: any) => {
      total = total + item.price * item.quantity;
    });
    return total;
  }

  async update(cart: ICart) {
    return firebase
      .firestore()
      .collection('users')
      .doc(Auth.auth.uid as string)
      .update({ cart });
  }

  guard() {
    if (!Auth.auth) {
      throw new Error('please login before performing this action');
    }
  }
}();
