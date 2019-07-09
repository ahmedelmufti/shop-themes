import { IPaymentMethod } from './types';
export const Payment = new class {
  stripe: {
    token: string;
    country: string;
    currency: string;
    shippingOptions: Array<Object>;
  };

  bootstrap(config) {
    this.stripe = {
      token: '',
      country: config.country,
      currency: config.currency,
      shippingOptions: config.shippingOptions
    };
  }
  paymentMethod: IPaymentMethod;

  create(checkout) {}
}();
