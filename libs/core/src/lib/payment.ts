import * as firebase from 'firebase/app';

import { post } from './utils';
import { IPaymentMethod } from './types';
import { ICart } from './cart';
import { Auth } from './auth';
export const Payment = new class {
  stripe: {
    apiKey: string;
    country: string;
    currency: string;
    shippingOptions: Array<Object>;
  };
  apiUrl = 'https://api.shop.jobizzness.com/api';
  paymentMethods: Array<IPaymentMethod>;

  /**
   *
   * @param config
   */
  bootstrap(config) {
    this.stripe = {
      apiKey: config.apiKey,
      country: config.country,
      currency: config.currency,
      shippingOptions: config.shippingOptions
    };
  }

  /**
   *
   * @param data
   */
  async createIntent(data: ICart) {
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
    return await post(`${this.apiUrl}/payment`, { $key: ref.id });
  }

  create(checkout) {}
}();
