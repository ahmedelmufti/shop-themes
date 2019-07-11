/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css, property, customElement } from 'lit-element';
import './stripe-payment.scss';
import { Payment } from '@shop-themes/core';
import { useLightDom } from '../use-lightdom';

declare global {
  interface Window {
    Stripe: any;
  }
}

// Create an instance of Stripe and Elements.
const Stripe = window.Stripe(Payment.stripe.apiKey);
const elements = Stripe.elements();

@customElement('remi-stripe-payments')
export class StripePayments extends useLightDom {
  @property({ type: Boolean })
  active = false;

  @property({ type: Object })
  paymentIntent;

  form: HTMLFormElement;

  submitButton: HTMLElement;

  paymentRequest;

  paymentResponse;

  card;

  error;

  stripeStyle = {
    base: {
      iconColor: '#666ee8',
      color: '#31325f',
      fontWeight: 400,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '15px',
      '::placeholder': {
        color: '#aab7c4'
      },
      ':-webkit-autofill': {
        color: '#666ee8'
      }
    }
  };

  protected render() {
    return html`

    <div id="confirmation">
        <div class="status processing">
          <h1>Completing your order…</h1>
          <p>We’re just waiting for the confirmation from your bank… This might take a moment but feel free to close this page.</p>
          <p>We’ll send your receipt via email shortly.</p>
        </div>
        <div class="status success">
          <h1>Thanks for your order!</h1>
          <p>Woot! You successfully made a payment with Stripe.</p>
          <p class="note">We just sent your receipt to your email address, and your items will be on their way shortly.</p>
        </div>
        <div class="status receiver">
          <h1>Thanks! One last step!</h1>
          <p>Please make a payment using the details below to complete your order.</p>
          <div class="info"></div>
        </div>
        <div class="status error">
          <h1>Oops, payment failed.</h1>
          <p>It looks like your order could not be paid at this time. Please try again or select a different payment option.</p>
          <p class="error-message"></p>
        </div>
    </div>
    </div>
      <div id="checkout">
      <div id="payment-request">
        <div id="payment-request-button"></div>
      </div>
      <form id="payment-form" @submit=${this.submit}>
        <p class="instruction">Complete your shipping and payment details below</p>
        <section>
          <h2>Shipping &amp; Billing Information</h2>
          <fieldset class="with-state">
            <label>
              <span>Name</span>
              <input name="name" class="field" placeholder="Jenny Rosen" required>
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" class="field" placeholder="jenny@example.com" required>
            </label>
            <label>
              <span>Address</span>
              <input name="address" class="field" placeholder="185 Berry Street Suite 550">
            </label>
            <label>
              <span>City</span>
              <input name="city" class="field" placeholder="San Francisco">
            </label>
            <label class="state">
              <span>State</span>
              <input name="state" class="field" placeholder="CA">
            </label>
            <label class="zip">
              <span>ZIP</span>
              <input name="postal_code" class="field" placeholder="94107">
            </label>
            <label class="select">
              <span>Country</span>
              <div id="country" class="field US">
                <select name="country" @change=${this.countryChange}>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="BE">Belgium</option>
                  <option value="BR">Brazil</option>
                  <option value="CA">Canada</option>
                  <option value="CN">China</option>
                  <option value="DK">Denmark</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                  <option value="HK">Hong Kong</option>
                  <option value="IE">Ireland</option>
                  <option value="IT">Italy</option>
                  <option value="JP">Japan</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MX">Mexico</option>
                  <option value="NL">Netherlands</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NO">Norway</option>
                  <option value="PT">Portugal</option>
                  <option value="SG">Singapore</option>
                  <option value="ES">Spain</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US" selected="selected">United States</option>
                </select>
              </div>
            </label>
          </fieldset>
          <p class="tip">Select another country to see different payment options.</p>
        </section>
        <section>
          <h2>Payment Information</h2>
          <nav id="payment-methods">
            <ul>
              <li>
                <input type="radio" name="payment" id="payment-card" value="card" checked>
                <label for="payment-card">Card</label>
              </li>
              <li>
                <input type="radio" name="payment" id="payment-ach_credit_transfer" value="ach_credit_transfer" checked>
                <label for="payment-ach_credit_transfer">Bank Transfer</label>
              </li>
              <li>
                <input type="radio" name="payment" id="payment-alipay" value="alipay">
                <label for="payment-alipay">Alipay</label>
              </li>
              <li>
                <input type="radio" name="payment" id="payment-bancontact" value="bancontact">
                <label for="payment-bancontact">Bancontact</label>
              </li>
              <li>
                <input type="radio" name="payment" id="payment-eps" value="eps">
                <label for="payment-eps">EPS</label>
              </li>
              <li>
                <input type="radio" name="payment" id="payment-ideal" value="ideal">
                <label for="payment-ideal">iDEAL</label>
              </li>
              <li>
                <input type="radio" name="payment" id="payment-giropay" value="giropay">
                <label for="payment-giropay">Giropay</label>
              </li>
              <li>
                <input type="radio" name="payment" id="payment-multibanco" value="multibanco">
                <label for="payment-multibanco">Multibanco</label>
              </li>
              <li>
                <input type="radio" name="payment" id="payment-sepa_debit" value="sepa_debit">
                <label for="payment-sepa_debit">SEPA Direct Debit</label>
              </li>
              <li>
                <input type="radio" name="payment" id="payment-sofort" value="sofort">
                <label for="payment-sofort">SOFORT</label>
              </li>
              <li>
                <input type="radio" name="payment" id="payment-wechat" value="wechat">
                <label for="payment-wechat">WeChat Pay</label>
              </li>
            </ul>
          </nav>
          <div class="payment-info card visible">
            <fieldset>
              <label>
                <span>Card</span>
                <div id="card-element" class="field"></div>
              </label>
            </fieldset>
          </div>
          <div class="payment-info sepa_debit">
            <fieldset>
              <label>
                <span>IBAN</span>
                <div id="iban-element" class="field"></div>
              </label>
            </fieldset>
            <p class="notice">By providing your IBAN and confirming this payment, you’re authorizing Payments Demo and Stripe, our payment
              provider, to send instructions to your bank to debit your account. You’re entitled to a refund under the terms
              and conditions of your agreement with your bank.</p>
          </div>
          <div class="payment-info ideal">
            <fieldset>
              <label>
                <span>iDEAL Bank</span>
                <div id="ideal-bank-element" class="field"></div>
              </label>
            </fieldset>
          </div>
          <div class="payment-info redirect">
            <p class="notice">You’ll be redirected to the banking site to complete your payment.</p>
          </div>
          <div class="payment-info receiver">
            <p class="notice">Payment information will be provided after you place the order.</p>
          </div>
          <div class="payment-info wechat">
            <div id="wechat-qrcode"></div>
            <p class="notice">Click the button below to generate a QR code for WeChat.</p>
          </div>
        </section>
        <button type="submit">Pay $${this.paymentIntent.amount}</button>
      </form>
      <div id="card-errors" class="element-errors"></div>
      <div id="iban-errors" class="element-errors"></div>
    </div>
    <div id="confirmation">
      <div class="status processing">
        <h1>Completing your order…</h1>
        <p>We’re just waiting for the confirmation from your bank… This might take a moment but feel free to close this page.</p>
        <p>We’ll send your receipt via email shortly.</p>
      </div>
      <div class="status success">
        <h1>Thanks for your order!</h1>
        <p>Woot! You successfully made a payment with Stripe.</p>
        <p class="note">We just sent your receipt to your email address, and your items will be on their way shortly.</p>
      </div>
      <div class="status receiver">
        <h1>Thanks! One last step!</h1>
        <p>Please make a payment using the details below to complete your order.</p>
        <div class="info"></div>
      </div>
      <div class="status error">
        <h1>Oops, payment failed.</h1>
        <p>It looks like your order could not be paid at this time. Please try again or select a different payment option.</p>
        <p class="error-message"></p>
      </div>

      <footer class="layout horizontal center-center">
        <mwc-button @click=${e =>
          this.complete(this.paymentResponse)}>Continue Shopping</mwc-button>
      </footer>
    </div>
  </div>
    `;
  }

  /**
   * Implement a Stripe Card Element that matches the look-and-feel of the app.
   *
   * This makes it easy to collect debit and credit card payments information.
   */
  protected firstUpdated() {
    // Create references to the main form and its submit button.
    this.form = this.querySelector('#payment-form');
    this.submitButton = this.querySelector('button[type=submit]');

    // Create a Card Element and pass some custom styles to it.
    this.card = elements.create('card', { style: this.stripeStyle });

    // Mount the Card Element on the page.
    this.card.mount(this.querySelector('#card-element'));
    this.monitor(this.card);

    this.paymentRequest = this.createPayment();
    this.afterPaymentCreated();
  }

  /**
   *
   * @param card
   */
  monitor(card) {
    // Monitor change events on the Card Element to display any errors.
    card.on('change', ({ error }) => {
      const cardErrors = document.getElementById('card-errors');
      if (error) {
        cardErrors.textContent = error.message;
        cardErrors.classList.add('visible');
      } else {
        cardErrors.classList.remove('visible');
      }
      // Re-enable the Pay button.
      this.submitButton.removeAttribute('disabled');
    });
  }

  countryChange(e) {
    //selectCountry(event.target.value);
  }

  /**
   *
   */
  createPayment() {
    return Stripe.paymentRequest({
      country: Payment.stripe.country,
      currency: Payment.stripe.currency,
      total: {
        label: 'Total',
        amount: 300
      },
      requestShipping: true,
      requestPayerEmail: true,
      shippingOptions: Payment.stripe.shippingOptions
    });
  }

  /**
   *
   */
  protected afterPaymentCreated() {
    this.paymentRequest.on('paymentmethod', this.confirmPayment);
    // this.paymentRequest.on('shippingoptionchange', this.paymentMethodChange);
  }

  /**
   * Confirm the PaymentIntent with the payment method returned from the payment request.
   * @param event
   */
  protected async confirmPayment(event) {
    const { error } = await Stripe.confirmPaymentIntent(
      this.paymentIntent.client_secret,
      {
        payment_method: event.paymentMethod.id,
        shipping: {
          name: event.shippingAddress.recipient,
          phone: event.shippingAddress.phone,
          address: {
            line1: event.shippingAddress.addressLine[0],
            city: event.shippingAddress.city,
            postal_code: event.shippingAddress.postalCode,
            state: event.shippingAddress.region,
            country: event.shippingAddress.country
          }
        }
      }
    );
    if (error) {
      this.error = error;
      // Report to the browser that the payment failed.
      event.complete('fail');
      this.onPayment({ error });
    } else {
      // Report to the browser that the confirmation was successful, prompting
      // it to close the browser payment method collection interface.
      event.complete('success');
      // Let Stripe.js handle the rest of the payment flow, including 3D Secure if needed.
      const response = await Stripe.handleCardPayment(
        this.paymentIntent.client_secret
      );
      this.onPayment(response);
    }
  }

  /**
   * Submited form, time to make payment
   * @param e
   */
  async submit(e) {
    e.preventDefault();
    const form = this.form;

    // Retrieve the user information from the form.
    const payment = form.querySelector('input[name=payment]:checked')['value'];
    const name = form.querySelector('input[name=name]')['value'];
    const country = form.querySelector('select[name=country] option:checked')[
      'value'
    ];
    const email = form.querySelector('input[name=email]')['value'];
    const shipping = {
      name,
      address: {
        line1: form.querySelector('input[name=address]')['value'],
        city: form.querySelector('input[name=city]')['value'],
        postal_code: form.querySelector('input[name=postal_code]')['value'],
        state: form.querySelector('input[name=state]')['value'],
        country
      }
    };
    // Disable the Pay button to prevent multiple click events.
    this.submitButton.setAttribute('disabled', '');
    this.submitButton.textContent = 'Processing…';

    // Let Stripe.js handle the confirmation of the PaymentIntent with the card Element.
    const response = await Stripe.handleCardPayment(
      this.paymentIntent.client_secret,
      this.card,
      {
        payment_method_data: {
          billing_details: {
            name
          }
        },
        shipping
      }
    );
    this.onPayment(response);
  }

  /**
   * will handle payment
   * @param paymentResponse
   */
  onPayment(paymentResponse) {
    this.paymentResponse = paymentResponse;
    const { paymentIntent, error } = paymentResponse;
    const confirmationElement = this.querySelector('#confirmation');

    if (error) {
      this.classList.remove('processing');
      this.classList.remove('receiver');
      confirmationElement.querySelector('.error-message')['innerText'] =
        error.message;
      this.classList.add('error');
    } else if (paymentIntent.status === 'succeeded') {
      // Success! Payment is confirmed. Update the interface to display the confirmation screen.
      this.classList.remove('processing');
      this.classList.remove('receiver');
      // Update the note about receipt and shipping (the payment has been fully confirmed by the bank).
      confirmationElement.querySelector('.note')['innerText'] =
        'We just sent your receipt to your email address, and your items will be on their way shortly.';
      this.classList.add('success');
    } else if (paymentIntent.status === 'processing') {
      // Success! Now waiting for payment confirmation. Update the interface to display the confirmation screen.
      this.classList.remove('processing');
      // Update the note about receipt and shipping (the payment is not yet confirmed by the bank).
      confirmationElement.querySelector('.note')['innerText'] =
        'We’ll send your receipt and ship your items as soon as your payment is confirmed.';
      this.classList.add('success');
    } else {
      // Payment has failed.
      this.classList.remove('success');
      this.classList.remove('processing');
      this.classList.remove('receiver');
      this.classList.add('error');
    }
  }

  /**
   *
   * @param paymentResponse
   */
  complete(paymentResponse) {
    this.dispatchEvent(
      new CustomEvent('complete', { detail: paymentResponse, bubbles: true })
    );
  }

  protected async shippingChange(e) {
    // Update the PaymentIntent to reflect the shipping cost.
    // const response = await store.updatePaymentIntentWithShippingCost(
    //   paymentIntent.id,
    //   store.getLineItems(),
    //   event.shippingOption
    // );
    // event.updateWith({
    //   total: {
    //     label: 'Total',
    //     amount: response.paymentIntent.amount,
    //   },
    //   status: 'success',
    // });
    // const amount = store.formatPrice(
    //   response.paymentIntent.amount,
    //   config.currency
    // );
    // submitButton.innerText = `Pay ${amount}`;
  }
}
