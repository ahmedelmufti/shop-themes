/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, LitElement, css, property, customElement } from 'lit-element';
import '@polymer/iron-image';

@customElement('remi-product-item')
class ProductItem extends LitElement {
  @property({ type: Object })
  data: any;

  static get styles() {
    const style = css`
      :host {
        display: block;
        height: 375px;
        position: relative;
        overflow: hidden;
      }
      :host([shadow]) {
        box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
      }
      :host(:not([featured])) .cart-icon {
        display: none;
      }
      .product-media {
        width: 100%;
        height: calc(100% - 104px);
        border-radius: 14px;
        overflow: hidden;
      }
      .wrapper,
      iron-image {
        width: 100%;
        height: 100%;
      }
      footer {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 105px;
        background: white;
      }
      .title {
        font-size: 1rem;
        font-weight: 600;
        color: #000000db;
        padding-bottom: 8px;
        margin: 0;
      }
      .price-tag {
        color: #d80b6d;
        font-size: 16px;
      }
      .flexed {
        display: flex;
      }
      .pad {
        padding: 1em;
      }
      button {
        color: white;
        border-radius: 25px !important;
        --mdc-theme-primary: var(--app-secondary-color);
      }
      .stats-item {
        margin-right: 12px;
        font-size: 12px;
        color: #5f5f5f;
      }
      .stats-item iron-icon {
        color: #bdbdbd;
        margin-right: 4px;
      }
      .stats {
        justify-content: center;
        align-items: center;
        margin-top: 12px;
      }
      @media only screen and (max-device-width: 480px) and (min-device-width: 320px) {
        .title {
          font-size: 0.8rem;
        }
      }
    `;

    return [style];
  }
  render() {
    return html`
      <div class="wrapper">
        <header></header>
        <div class="product-media">
          <iron-image style="background-color: lightgray;" sizing="cover" preload fade .src="${
            this.thumbnail
          }">
          </iron-image>
        </div>
        <footer>
          <div class="pad">
            <h4 class="title">${this.data.name}</h4>
            <div class="flexed">
              <span class="price-tag">$${this.data.price.value}</span>
              <span style="flex:1"></span>
              <!-- <button
                        class="mdc-button mdc-button--dense mdc-button--raised"
                      >
                        Add to Cart
                      </button> -->
            </div>
        </footer>
      </div>
    `;
  }

  // static get properties() {
  //   return {
  //     title: String,
  //     forAdmin: {
  //       type: Boolean,
  //       reflectToAttribute: true
  //     },
  //     data: {
  //       type: Object,
  //       value: {}
  //     }
  //   };
  // }

  constructor() {
    super();
  }

  get thumbnail() {
    return this.data.media.length > 0 && this.data.media[0].downloadURL;
  }

  _firstRendered() {}

  _didRender(properties, changeList) {}
}
