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
import { useLightDom } from '../use-lightdom';
import { Shop, Cart, Payment } from '@shop-themes/core';

@customElement('remi-payment-form')
export class PaymentForm extends useLightDom {
  @property({ type: Boolean })
  active = false;

  private intent = null;

  protected render() {
    return html`
      <div>
        ${this.intent
          ? html`
              <remi-stripe-payments
                .data=${Cart.data}
                .paymentIntent=${this.intent}
              ></remi-stripe-payments>
            `
          : html`
              <div class="layout vertical center-center fullbleed">
                <spinner></spinner>
                <h1>Hold tight</h1>
                <p>Let's place your order</p>
              </div>
            `}
      </div>
    `;
  }

  protected async firstUpdated() {
    if (document.getElementById('stripe-script')) {
      return this.createIntent();
    }

    const node = document.createElement('script');
    node.id = 'stripe-script';
    node.onload = async e => {
      await import('./stipe-payments'); // This components assumes stripe is already loaded
      await this.createIntent();
    };
    node.src = 'https://js.stripe.com/v3/';
    document.body.appendChild(node);
  }

  async createIntent() {
    this.intent = await Payment.createIntent(Cart.data);
    this.requestUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('we are destroying this checkout request.');
  }
}
