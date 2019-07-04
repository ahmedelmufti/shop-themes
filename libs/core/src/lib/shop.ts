import { collectionData, docData } from 'rxfire/firestore';
import { tap } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

export const Shop = new class {
  private isInitialized: Boolean = false;
  private firebase;

  constructor() {
    console.log('howdy i am shop module from core');
  }

  products() {
    return this;
  }

  bootstrap(config) {
    if (this.isInitialized) {
      throw new Error('app cannot be initialized more than once.');
    }
    this.firebase = firebase.initializeApp(config);
  }

  latest(number: Number) {
    const productsRef = this.firebase.firestore().collection('products');
    return collectionData(productsRef, 'id');
  }
}();
