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
import { ICartItem } from '@shop-themes/core';
import '@material/mwc-button';
import '@material/mwc-icon';

import './quantity-input';
import { removeFromCartIcon } from '../icons';

@customElement('remi-cart-item')
export class CartItem extends LitElement {
  @property({ type: Object })
  data: ICartItem;

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
        position: relative;
      }
      .inner {
        display: flex;
      }
      .inner > * {
        flex: 1;
      }
      .row {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .flex {
        flex: 1;
      }
      .product-media {
        max-width: 275px;
        background-color: var(--hw-product-card-background, #fafafa);
        height: 300px;
        background-size: cover;
        border-bottom-right-radius: 13px;
        border-top-left-radius: 13px;
        overflow: hidden;
      }
      .info {
        padding: 0 1em;
      }

      .name {
        text-decoration: none;
        color: black;
      }
      .name h1 {
        line-height: 1;
        margin-top: 1em;
        font-weight: 400;
        font-size: 1.4rem;
      }
      .info {
        display: flex;
        flex-direction: column;

        justify-content: center;
      }
      .info > * {
        width: 100%;
      }
      .pricing {
        text-align: right;
      }
      .price {
        font-weight: 600;
        font-size: 1.3rem;
        color: var(--app-primary-color);
        margin: 0;
      }
      .price-compare {
        margin: 0;
        text-decoration: line-through;
        font-weight: 600;
        color: #a0a0a0;
      }

      .delete-btn {
        position: absolute;
        top: 16px;
        right: 12px;
        color: #757575;
      }
      .quantity-label {
        margin-right: 1em;
        font-size: 1.2rem;
        font-weight: 600;
      }
      .name-price-wrapper {
        margin-bottom: 1em;
      }
      @media only screen and (max-device-width: 768px) and (min-device-width: 320px) {
        remi-color-swatch-input {
          display: none;
        }
      }
      @media only screen and (max-device-width: 480px) and (min-device-width: 320px) {
        .quantity-label {
          display: none;
        }
        .product-media {
          max-width: 140px;
          height: 130px;
        }
        .name h1 {
          font-size: 1rem;
        }
        .row {
          display: block;
        }
        .pricing {
          font-size: 0.9rem;
          text-align: left;
        }
        .price {
          font-size: 0.9rem;
        }
        .price-compare {
          font-size: 0.7rem;
        }
      }
    `;
  }

  protected render() {
    return html`
      <div class="inner">
        <mwc-button class="delete-btn" @click=${this._delete}>
          ${removeFromCartIcon}
        </mwc-button>
        <div
          class="product-media"
          style="background-image: url(${this.thumbnail})"
        >
          <img hidden .src="" alt="a" />
        </div>

        <div class="info flex layout vertical">
          <div class="row name-price-wrapper">
            <a class="name" href="/product/">
              <h1>${this.data.product.name}</h1>
            </a>
            <span class="flex"></span>
            <div class="pricing">
              <p class="price">Now ${this.data.product.price.value} USD</p>
              <p class="price-compare">
                was ${this.data.product.price.compare} USD
              </p>
            </div>
          </div>

          <!-- Quantity -->
          <div class="row quantity-wrapper">
            <span class="quantity-label">Quantity:</span
            ><remi-quantity-input></remi-quantity-input>
            <span class="flex"></span>
          </div>

          <div class="layout horizontal"></div>
        </div>
      </div>
    `;
  }

  get thumbnail() {
    return (
      this.data.product.media.length > 0 &&
      this.data.product.media[0].downloadURL
    );
  }

  _delete(e) {
    this.dispatchEvent(new CustomEvent('delete', { detail: this.data }));
  }

  _quantityChange(e) {
    this.dispatchEvent(
      new CustomEvent('quantity-changed', { detail: this.data })
    );
  }
}
