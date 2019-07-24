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

@customElement('remi-address-item')
export class AddressItem extends LitElement {
  @property({ type: Object })
  data;

  static get styles() {
    return css`
      :host {
        padding: 1em;
        max-width: 300px;
        display: block;
      }

      :host([selected]) {
        background: #f5f5f5;
      }

      header {
        height: 100px;
        background-image: url(/assets/images/address.png);
      }
      .info {
        padding: 12px;
      }
      address {
        line-height: 1.2;
        font-size: 0.8rem;
      }
      address,
      p {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 500;
        color: black;
      }
      .phone {
      }
    `;
  }

  protected render() {
    return html`
      <div>
        <header></header>
        <div class="info">
          <address>
            ${this.data.address}
          </address>
        </div>
      </div>
    `;
  }
}
