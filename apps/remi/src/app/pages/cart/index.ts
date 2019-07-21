/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css, property, customElement } from 'lit-element';
import { useLightDom } from '../../use-lightdom';

// Components
import '@polymer/iron-image';
import '@material/mwc-button';
import '@shop-themes/editable-text';

import '../../components/cart-item';
import './style.scss';

import { Shop, Cart, ICart, Payment, Auth, IUser } from '@shop-themes/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@customElement('remi-cart')
export class CartPage extends useLightDom {
  @property({ type: Boolean })
  active = false;

  @property({ type: Boolean })
  isLoading: Boolean = true;

  @property({ type: Object })
  data: ICart;

  @property({ type: Object })
  user: IUser;

  get items() {
    return this.data ? this.data.items : [];
  }

  get isEmpty() {
    return this.items.length < 1;
  }

  protected render() {
    return html`
      <header class="pad layout horizontal center-center">
        <div>
          Your Cart
        </div>
        <span class="flex"></span>
        <div>
          <mwc-button
            ?hidden=${this.isEmpty}
            unelevated
            accent
            @click=${this.checkout}
            >Checkout $${this.getTotal(this.data)}</mwc-button
          >
        </div>
      </header>
      <section class="page-wrapper content">
        <div class="cart-items">
          ${!this.isLoading
            ? this.items.map(
                item => html`
                  <remi-cart-item
                    @delete=${this.removeItem}
                    .data=${item}
                    class="cart-items--item"
                  ></remi-cart-item>
                `
              )
            : this.renderLoaders()}
        </div>
      </section>
      <remi-checkout-overview
        id="checkout"
        .user=${this.user}
      ></remi-checkout-overview>
    `;
  }

  checkout() {
    const checkout$ = this.querySelector('#checkout') as any;
    checkout$.open();
  }

  /**
   *
   */
  renderLoaders() {
    return [1, 2].map(
      _ => html`
        <div class="remi-product-item-placeholder feature-item">
          <div class="remi-product-item-placeholder--image"></div>
          <div class="remi-product-item-footer pad">
            <div
              class="remi-product-item-placeholder--title placeholder-shimmer"
            ></div>
            <div
              class="remi-product-item-placeholder--price placeholder-shimmer"
            ></div>
          </div>
        </div>
      `
    );
  }

  constructor() {
    super();

    Payment.bootstrap({
      apiKey: environment.payment.apiKey,
      country: environment.shop.country,
      currency: environment.shop.currency,
      shippingOptions: environment.shop.shippingOptions
    });
  }

  removeItem({ detail: item }) {
    Cart.remove(item);
  }

  protected getTotal(data: ICart) {
    return data && data.total;
  }

  protected firstUpdated() {
    import('../../components/checkout-overview').then(_ => {});
    import('firebase/firestore').then(_ => this.afterFirestoreIsLoaded());
  }

  afterFirestoreIsLoaded() {
    Cart.data$.pipe(filter(cart => cart != null)).subscribe(cart => {
      this.isLoading = false;
      this.data = cart;
    });

    Auth.user$.subscribe(user => (this.user = user));
  }
}
