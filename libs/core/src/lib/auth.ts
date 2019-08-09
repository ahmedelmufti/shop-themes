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

  get authState$() {
    return authState(firebase.auth());
  }

  set user(val: IUser) {
    this._user.next(val);
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

  async update(changes) {
    if (!this.auth) {
      throw new Error('user is not logged it for this action');
    }

    const user = firebase.auth().currentUser;

    if (changes.email) {
      await user.updateEmail(changes.email);
    }

    //TODO: phone must be unique
    if (changes.phone) {
      // await user.updatePhoneNumber(changes.phone);
    }

    if (changes.name) {
      await user.updateProfile({ displayName: changes.name });
    }

    await this.updateFromAuth(this.auth);
  }

  /**
   *
   * @param auth
   */
  private async updateFromAuth(auth) {
    return firebase
      .firestore()
      .collection('users')
      .doc(auth.uid)
      .update({
        uid: auth.uid,
        name: auth.displayName,
        avatar: auth.photoURL,
        phone: auth.phoneNumber
      });
  }

  /**
   * @return Promise
   */
  async loginAnonymously() {
    const { user } = await firebase.auth().signInAnonymously();
    return firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set({ isAnonymous: true, uid: user.uid });
  }
}();
