import * as firebase from 'firebase/app';

import { collectionData, docData } from 'rxfire/firestore';
import { ICart } from './cart';

export interface IProductMedia {
  downloadURL: String;
  path: String;
}

export interface IProduct {
  $key?: String;
  name: String;
  media: Array<IProductMedia>;
  price: {
    value: String;
    compare?: String;
  };
}

export const Shop = new class {
  /**
   *
   * @param slug
   */
  getProduct(slug) {
    const productRef = firebase
      .firestore()
      .collection('products')
      .doc(slug);
    return docData(productRef, '$key');
  }

  constructor() {}

  /**
   *
   */
  products() {
    return this;
  }

  // TODO:
  checkout(cart: ICart) {
    // means create checkout
    // but there has to be a user that is logged in
  }

  async createPaymentIntent(data: ICart) {
    // throw new Error('Method not implemented.');
  }

  /**
   *
   * @param number
   */
  latest(number: Number) {
    const productsRef = firebase.firestore().collection('products');
    return collectionData(productsRef, '$key');
  }
}();
