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
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

export interface RouteData {
  params: Array<String>;
  path: String;
  page: String;
}
class AppRouter {
  public data$;

  private _dataObserver;

  constructor() {
    this.data$ = Observable.create(observer => {
      this._dataObserver = observer;
      installRouter(this.whenLocationChanges.bind(this));
    }).pipe(share());
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
    this._dataObserver.next(data);
  }
}

export const Router = new AppRouter();
