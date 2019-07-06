import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { authState, user } from 'rxfire/auth';
import { collectionData, docData } from 'rxfire/firestore';

export interface User {}

export const Auth = new class {
  items: Array<any> = [];
  quantity: Number = 0;
  total: Number = 0;

  private readonly _user = new BehaviorSubject<User>(null);

  // Expose the observable$ part of the _todos subject (read only stream)
  readonly user$ = this._user.asObservable();

  // the getter will return the last value emitted in _todos subject
  get user(): User {
    return this._user.getValue();
  }

  bootstrap() {
    this.authState$
      .pipe(
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
      .subscribe(val => (this.user = val));
  }

  get authState$() {
    return authState(firebase.auth());
  }

  // assigning a value to this.todos will push it onto the observable
  // and down to all of its subsribers (ex: this.todos = [])
  set user(val: User) {
    this._user.next(val);
  }

  loginAnonymously() {
    return firebase.auth().signInAnonymously();
  }

  login() {}
}();
