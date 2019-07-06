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
import { Shop, Cart, ICart } from '@shop-themes/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@customElement('remi-cart')
export class CartPage extends useLightDom {
  @property({ type: Boolean })
  active = false;

  @property({ type: Boolean })
  isLoading: Boolean = true;

  data: ICart;

  get items() {
    return this.data ? this.data.items : [];
  }

  get isEmpty() {
    return this.items.length < 1;
  }
  protected render() {
    return html`
      <!-- <header class="pad"></header> -->
      <section class="page-wrapper content">
        <div class="cart-items">
          ${!this.isLoading
            ? this.items.map(
                item => html`
                  <remi-cart-item
                    .data=${item}
                    class="cart-items--item"
                  ></remi-cart-item>
                `
              )
            : this.renderLoaders()}
        </div>
      </section>
    `;
  }

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
  }

  protected async firstUpdated() {
    await import('firebase/firestore');
    Cart.data$.pipe(filter(cart => cart != null)).subscribe(cart => {
      console.log(cart);
      this.isLoading = false;
      this.data = cart;
      this.requestUpdate();
    });
  }
}
