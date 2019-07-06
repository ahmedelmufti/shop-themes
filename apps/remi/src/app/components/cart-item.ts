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

@customElement('remi-cart-item')
export class CartItem extends LitElement {
  @property({ type: Object })
  data: ICartItem;

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }
      .price-name {
        display: flex;
      }
      .inner {
      }
      .media {
        width: 100%;
        height: 257px;
      }
      iron-image {
        width: 100%;
        height: 100%;
      }
      .info {
        padding: 1em;
      }
      .flex {
        flex: 1;
      }
      .center {
        align-items: center;
        justify-content: center;
      }
      .name {
        font-size: 0.5rem;
        text-decoration: none;
        color: #424242;
      }
      .name h1 {
        font-weight: 500;
      }
      .price {
        font-weight: 600;
      }
      .delete-btn {
        position: absolute;
        top: 16px;
        right: 12px;
        color: #757575;
      }
      @media only screen and (max-device-width: 768px) and (min-device-width: 320px) {
      }
      @media only screen and (max-device-width: 480px) and (min-device-width: 320px) {
      }
    `;
  }

  protected render() {
    return html`
      <div class="inner">
        <div class="media">
          <iron-image
            style="background-color: lightgray;"
            sizing="cover"
            preload
            fade
            src="${this.thumbnail}"
          >
          </iron-image>
        </div>
        <div class="info flex">
          <div class="price-name center">
            <a class="name" href$="/product/${this.data.product.slug}">
              <h1>${this.data.product.name}</h1>
            </a>
            <span class="flex"></span>
            <span class="price">$${this.data.product.price.value}</span>
          </div>
          <div>
            <!-- Color -->
            <remi-color-swatch-input readonly></remi-color-swatch-input>
            <!-- Quantity -->
            <quantity-input
              min="1"
              max="7"
              value$="${this.data.quantity}"
              on-value-change="${e => this._quantityChange(e)}"
            ></quantity-input>
            <span class="flex"></span>
          </div>
        </div>
        <div style="padding-bottom: 1em;"></div>
        <paper-icon-button
          icon="bn-icons:close"
          class="delete-btn"
          on-click="${e => this._delete(e)}"
        ></paper-icon-button>
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

  _quantityChange() {
    this.dispatchEvent(
      new CustomEvent('quantity-changed', { detail: this.data })
    );
  }
}
