import { collectionData, docData } from 'rxfire/firestore';
import { tap } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

export const Shop = new class {
  private isInitialized: Boolean = false;
  private firebase;

  /**
   *
   * @param slug
   */
  getProduct(slug) {
    const productRef = this.firebase
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
    const productsRef = this.firebase.firestore().collection('products');
    return collectionData(productsRef, 'id');
  }

  /**
   *
   * @param config
   */
  bootstrap(config) {
    if (this.isInitialized) {
      throw new Error('app cannot be initialized more than once.');
    }
    this.firebase = firebase.initializeApp(config);
  }
}();
