import { ICart } from './cart';

export interface IAddress {}

export interface IUser {
  isAnonymous: Boolean;
  uid: String;
  cart: ICart;
  addresses: Array<any>;
}

export interface IPaymentMethod {
  name: 'CARD' | 'GOOGLE_PAY' | 'APPLE_PAY';
}
