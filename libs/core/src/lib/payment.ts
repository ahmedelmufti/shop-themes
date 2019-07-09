import { IPaymentMethod } from './types';
export const Payment = new class {
  paymentMethod: IPaymentMethod;

  create(checkout) {}
}();
