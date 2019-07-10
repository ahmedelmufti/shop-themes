import * as firebase from 'firebase/app';

import { collectionData, docData } from 'rxfire/firestore';

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
   * @param number
   */
  latest(number: Number) {
    const productsRef = firebase.firestore().collection('products');
    return collectionData(productsRef, '$key');
  }
}();
