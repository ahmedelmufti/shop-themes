import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { authState, user } from 'rxfire/auth';
import { collectionData, docData } from 'rxfire/firestore';
import { ICart } from './cart';
import { IAddress, IUser } from './types';

export const Auth = new class {
  items: Array<any> = [];
  quantity: Number = 0;
  total: Number = 0;

  private readonly _user = new BehaviorSubject<IUser>(null);

  readonly user$ = this._user.asObservable();

  public auth: { uid: String };

  get user(): IUser {
    return this._user.getValue();
  }

  bootstrap() {
    this.authState$
      .pipe(
        tap(auth => (this.auth = auth)),
        filter(auth => auth !== null),
        switchMap(auth =>
          docData(
            firebase
              .firestore()
              .collection('users')
              .doc(auth.uid)
          )
        )
      )
      .subscribe((val: IUser) => (this.user = val));
  }

  get authState$() {
    return authState(firebase.auth());
  }

  set user(val: IUser) {
    this._user.next(val);
  }

  async addAdress(address: IAddress) {
    if (!Auth.user) {
      throw new Error('user is not authenticated');
    }

    const addresses = Auth.user.addresses || [];
    addresses.push(address);

    return firebase
      .firestore()
      .collection('users')
      .doc(Auth.user.uid as string)
      .update({ addresses });
  }

  async loginAnonymously() {
    const { user } = await firebase.auth().signInAnonymously();
    return firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set({ isAnonymous: true, uid: user.uid });
  }

  login() {}
}();
