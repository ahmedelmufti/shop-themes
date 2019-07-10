import * as firebase from 'firebase/app';

import { collectionData, docData } from 'rxfire/firestore';
import { ICart } from './cart';
import { post } from './utils';
import { Auth } from './auth';

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

  /**
   *
   * @param data
   */
  async createPaymentIntent(data: ICart) {
    // throw new Error('Method not implemented.');
    const ref = await firebase
      .firestore()
      .collection('checkout')
      .add({
        uid: Auth.user.uid,
        items: data.items,
        quantity: data.quantity,
        total: data.total
      });
    return await post('http://localhost:3333/api/payment', { $key: ref.id });
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
