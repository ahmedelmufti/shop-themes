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
import '../../components/product-item';

import './style.scss';
import { Shop } from '@shop-themes/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@customElement('remi-cart')
export class CartPage extends useLightDom {
  @property({ type: Boolean })
  active = false;

  private latestProducts$: Observable<any>;

  latest = [];

  protected render() {
    return html`
      <section class="content">
        <header class="pad">
          <!-- <div>
            <h1>Your Shopping Cart</h1>
            <p>Review of <span>[[numItems]]</span> items <span>$[[total]]</span></p>
            <div class="spacer"></div> -->
          </div>
        </header>
        <div class="grid">
          <template is="dom-repeat" items="[[items]]">
            <remi-cart-item
              data="[[item]]"
              on-delete="_delete"
              on-quantity-changed="(_quantity - changed)"
            ></remi-cart-item>
          </template>
        </div>
        <footer hidden$="[[!numItems]]">
          <div class="footer-inner">
            <button class="mdc-button mdc-button--raised" on-click="(_checkout)">
              Checkout
            </button>
          </div>
        </footer>
      </section>
    `;
  }

  renderLoaders() {
    return [1, 2, 3].map(
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
  }

  protected async firstUpdated() {
    await import('firebase/firestore');
    this.latestProducts$ = Shop.products()
      .latest(5)
      .pipe(filter(products => products.length > 0));
    this.latestProducts$.subscribe(products => {
      this.latest = products;
      this.requestUpdate();
    });
  }
}
