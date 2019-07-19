/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { installRouter } from 'pwa-helpers/router.js';
import { Observable, BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';

export interface RouteData {
  params: Array<String>;
  path: String;
  page: String;
}
class AppRouter {
  /**
   *
   */
  private readonly _data = new BehaviorSubject<RouteData>(null);

  /**
   *
   */
  readonly data$ = this._data.asObservable();

  /**
   *
   */
  get user(): RouteData {
    return this._data.getValue();
  }

  /**
   *
   */
  set data(val: RouteData) {
    this._data.next(val);
  }

  constructor() {
    installRouter(this.whenLocationChanges.bind(this));
  }

  goTo(path) {
    window.history.pushState({}, null, path);
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  /**
   *
   * @param location
   */
  whenLocationChanges(location) {
    const path = decodeURIComponent(location.pathname);
    const params = path.split('/');
    const page = path === '/' ? 'default' : params[1];
    const data: RouteData = {
      params,
      page,
      path
    };
    this.data = data;
  }
}

export const Router = new AppRouter();
