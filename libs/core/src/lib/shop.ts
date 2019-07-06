import * as firebase from 'firebase/app';

import { collectionData, docData } from 'rxfire/firestore';

export interface IProduct {}

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
    return docData(productRef, 'id');
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
   * @param number
   */
  latest(number: Number) {
    const productsRef = firebase.firestore().collection('products');
    return collectionData(productsRef, 'id');
  }
}();
