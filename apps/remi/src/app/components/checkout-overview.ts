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
import { MDCDialog } from '@material/dialog';
import { MDCTextField } from '@material/textfield';

import { useLightDom } from '../use-lightdom';

import '@material/dialog/dist/mdc.dialog.min.css';
import '@material/textfield/dist/mdc.textfield.css';
import './checkout-overview.scss';
import './address-form';

import { backIcon } from '../icons';

@customElement('remi-checkout-overview')
export class CheckoutOverview extends useLightDom {
  @property({ type: Boolean })
  active = false;

  @property({ type: Boolean })
  isLoading = true;

  private dialog: MDCDialog;

  open() {
    this.dialog.open();
  }

  protected firstUpdated() {
    this.dialog = new MDCDialog(this.querySelector('.mdc-dialog'));

    this.dialog.listen('MDCDialog:closing', () => {
      // this.reset();
    });
    this.querySelectorAll('.mdc-text-field').forEach(
      item => new MDCTextField(item)
    );
    import('./payment-form').then(_ => {});
  }

  protected render() {
    return html`
      <div
        #mdcDialog
        class="mdc-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="my-dialog-title"
        aria-describedby="my-dialog-content"
      >
        <div class="mdc-dialog__container">
          <div class="mdc-dialog__surface">
            <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
            <header class="layout horizontal pad">
              <mwc-button data-mdc-dialog-action="no">
                ${backIcon}
              </mwc-button>
              <span class="flex"></span>
              <div class="layout horizontal center-center">
                <h2>
                  Checkout
                </h2>
              </div>
              <span class="flex"></span>
            </header>
            <main class="mdc-dialog__content">
              <div class="layout horizontal center">
                <p>If you have any troubles please contact our support.</p>
                <span class="flex"></span>
                <div>
                  <iron-icon icon="bn-icons:phone"></iron-icon>
                  8 800 505 04 83
                </div>
              </div>
              <div class="wrapper">
                <h2>General Information</h2>
                <section class="row">
                  <div
                    class="mdc-text-field text-field mdc-text-field--dense mdc-text-field--box mdc-text-field--with-leading-icon"
                  >
                    <iron-icon
                      class="mdc-text-field__icon"
                      icon="bn-icons:email"
                    ></iron-icon>
                    <input
                      id="name"
                      name="name"
                      type="name"
                      required
                      value=""
                      class="mdc-text-field__input"
                    />
                    <label class="mdc-floating-label" for="name">Email</label>
                    <div class="mdc-line-ripple"></div>
                  </div>
                  <div
                    class="mdc-text-field text-field mdc-text-field--dense mdc-text-field--box mdc-text-field--with-leading-icon"
                  >
                    <iron-icon
                      class="mdc-text-field__icon"
                      icon="bn-icons:email"
                    ></iron-icon>
                    <input
                      id="name"
                      name="name"
                      type="name"
                      required
                      value=""
                      class="mdc-text-field__input"
                    />
                    <label class="mdc-floating-label" for="name"
                      >Phone Number</label
                    >
                    <div class="mdc-line-ripple"></div>
                  </div>
                </section>

                <h2>Shipping Address</h2>
                <div class="grid"></div>
                <!-- Show addresses here list here -->

                <section class="actions layout horizontal center-center">
                  <mwc-button raised disabled id="submit-button">
                    Place Order
                  </mwc-button>
                </section>
              </div>
            </main>
          </div>
        </div>
        <div class="mdc-dialog__scrim"></div>
      </div>
    `;
  }
}
