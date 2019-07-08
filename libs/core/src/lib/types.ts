import { ICart } from './cart';
export interface IAddress {}

export interface IUser {
  uid: String;
  cart: ICart;
  addresses: Array<any>;
}
