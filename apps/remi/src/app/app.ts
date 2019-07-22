import { html, property, PropertyValues, customElement } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { Router, RouteData } from '@shop-themes/router';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { useLightDom } from './use-lightdom';

// These are the elements needed by this element.
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import './app.scss';
import '../../src/assets/styles/iron-flex.scss';
import {
  Bootstrap,
  Auth,
  IUser,
  ICart,
  EMPTY_CART,
  Cart
} from '@shop-themes/core';
import { environment } from '../environments/environment';
import { backIcon, cartIcon } from './icons';
import { filter } from 'rxjs/operators';
import { transition } from './transition';

@customElement('remi-app')
export class App extends useLightDom {
  @property({ type: String })
  appTitle = 'Reminiscebyro';

  @property({ type: String })
  private page;

  private pageChanges = { prev: null, next: null };

  @property({ type: Object })
  private cart: ICart = EMPTY_CART;

  @property({ type: Boolean })
  private _offline = false;

  private user: IUser;

  private $pages;

  protected render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <!-- Header -->
      <app-header condenses reveals effects="waterfall">
        <app-toolbar class="toolbar-top">
          <mwc-button id="back-btn" @click=${this.goBack}>
            ${backIcon}
          </mwc-button>
          <a href="/" main-title>${this.appTitle}</a>
          <a href="/cart">
            <mwc-button cart-btn>
              <span>${cartIcon}</span>
              <span class="cart-badge">${this.cart.quantity}</span>
            </mwc-button>
          </a>
        </app-toolbar>
        <!-- This gets hidden on a small screen-->
        <nav class="toolbar-list">
          <a ?selected="${this.page === 'home'}" href="/home">Home</a>
          <a ?selected="${this.page === 'shop'}" href="/shop">Shop</a>
          <a ?selected="${this.page === 'about'}" href="/about">About</a>
        </nav>
      </app-header>
      <!-- Main content -->
      <main role="main" class="main-content" id="pages">
        <remi-home class="page" page="home"></remi-home>
        <remi-auth class="page" page="auth"></remi-auth>
        <remi-shop class="page" page="shop"></remi-shop>
        <remi-cart class="page" page="cart"></remi-cart>
        <remi-product-detail class="page" page="product"></remi-product-detail>
        <my-view404 class="page" page="view404"></my-view404>
      </main>
      <footer class="app-footer">
        <div class="content layout horizontal center">
          <div class="flex">
            <h3>What we do?</h3>
            <p>
              Reminisce by Ro is all about women empowerment. Bringing the
              beauty in every individual. It might take that one Reminisce
              product to bring out the confidence in you.
            </p>
          </div>
          <div class="flex"></div>
          <div class="flex">
            <h4>Contact</h4>
            <ul class="contact-info">
              <li class="location">
                <iron-icon icon="bn-icons:location"></iron-icon> 123 East 3rd
                Street, New York City 10010
              </li>
              <li class="email">
                <iron-icon icon="bn-icons:email"></iron-icon>
                <a href="mailto:sales@reminiscebyro.com"
                  >sales@reminiscebyro.com</a
                >
              </li>
              <li class="phone">
                <iron-icon icon="bn-icons:phone"></iron-icon> 555 - 478 - 951
              </li>
              <li class="website">
                <iron-icon icon="bn-icons:globe"></iron-icon>
                <a href="https://reminiscebyro.com">www.reminiscebyro.com</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    `;
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
    Bootstrap(environment.firebaseConfig);
  }

  protected firstUpdated() {
    Router.data$.subscribe((route: RouteData) => this.routeChanged(route));
    import('./lazy').then(module => {});
    this.listenToAuth();
    this.$pages = this.querySelector('#pages');
    // installOfflineWatcher(offline => store.dispatch(updateOffline(offline)));
    // installMediaQueryWatcher(`(min-width: 460px)`, () =>
    //   // store.dispatch(updateDrawerState(false))
    // );
  }

  protected listenToAuth() {
    import('firebase/auth')
      .then(_ => import('firebase/firestore'))
      .then(_ => {
        Auth.bootstrap();
        Cart.bootstrap();
      });
    Auth.user$.pipe(filter(user => user !== null)).subscribe((user: IUser) => {
      this.user = user;
      if (user) {
        this.cart = user.cart || EMPTY_CART;
      }
    });
  }

  protected async loginAnonymously() {
    await Auth.loginAnonymously();
  }

  protected async routeChanged(route: RouteData) {
    // load the page
    this.pageChanges.prev = this.page;
    await this.load(route.page);
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('page')) {
      this.pageChanges.next = this.page;

      this.makeTransition(this.pageChanges);
      // const pageTitle = this.appTitle + ' - ' + this._page;
      // updateMetadata({
      //   title: pageTitle,
      //   description: pageTitle
      //   // This object also takes an image property, that points to an img src.
      // });
    }
  }

  private async makeTransition({ prev, next }) {
    const $prev = this.$pages.querySelector(`[page=${prev}]`);
    const $next = this.$pages.querySelector(`[page=${next}]`);
    if ($prev) {
      $prev.classList.add('animating', 'leave');
      await transition($prev, 350);
      $prev.classList.remove('animating', 'leave', 'active');
    }

    if ($next) {
      $next.classList.add('animating', 'enter', 'active');
      await transition($next, 350);
      $next.classList.remove('animating', 'enter');
    }
  }

  private async load(page: String) {
    if (page === 'default') {
      page = 'home';
    }
    switch (page) {
      case 'home':
      case 'default':
        import('./pages/home/').then(module => {
          // Put code in here that you want to run every time when
          // navigating to view1 after my-view1.js is loaded.
        });
        break;
      case 'product':
        await import('./pages/product/');
        break;
      case 'shop':
        await import('./pages/shop/');
        break;
      case 'cart':
        await import('./pages/cart/');
        break;
      case 'auth':
        await import('./pages/auth/');
        break;
      default:
        page = 'view404';
      //import('../components/my-view404.js');
    }
    this.setAttribute('page', page as string);
    this.page = page;
  }

  goBack() {
    window.history.back();
  }
}
