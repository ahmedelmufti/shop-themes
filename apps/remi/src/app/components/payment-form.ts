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
import { Shop, Cart } from '@shop-themes/core';

@customElement('remi-payment-form')
export class PaymentForm extends useLightDom {
  @property({ type: Boolean })
  active = false;

  private intent;

  protected render() {
    return html`
      <div>
        <remi-stripe-payments
          paymentIntent=${this.intent}
        ></remi-stripe-payments>
      </div>
    `;
  }

  protected async firstUpdated() {
    this.intent = await Shop.createPaymentIntent(Cart.data);
    const node = document.createElement('script');
    node.onload = async e => {
      await import('./stipe-payments');
    };
    node.src = 'https://js.stripe.com/v3/';
    document.body.appendChild(node);
  }
}
