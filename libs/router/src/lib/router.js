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
import { BehaviorSubject } from 'rxjs';
class AppRouter {
    constructor() {
        /**
         *
         */
        this._data = new BehaviorSubject(null);
        /**
         *
         */
        this.data$ = this._data.asObservable();
        installRouter(this.whenLocationChanges.bind(this));
    }
    /**
     *
     */
    get data() {
        return this._data.getValue();
    }
    /**
     *
     */
    set data(val) {
        this._data.next(val);
    }
    goTo(path) {
        window.history.pushState({}, null, path);
        this.whenLocationChanges(window.location);
    }
    /**
     *
     * @param location
     */
    whenLocationChanges(location) {
        const path = decodeURIComponent(location.pathname);
        const params = path.split('/');
        const page = path === '/' ? 'default' : params[1];
        const data = {
            params,
            page,
            path
        };
        this.data = data;
    }
}
export const Router = new AppRouter();
