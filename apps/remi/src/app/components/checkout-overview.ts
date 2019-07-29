/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, property, customElement, TemplateResult } from 'lit-element';
import { MDCDialog } from '@material/dialog';
import { MDCTextField } from '@material/textfield';

import { useLightDom } from '../use-lightdom';

import '@polymer/iron-selector/iron-selector.js';
import '../../assets/styles/textfield.scss';
import '../../assets/styles/dialog.scss';
import './checkout-overview.scss';

import { backIcon, plusIcon } from '../icons';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { IAddress, Auth, IUser, Cart } from '@shop-themes/core';
import { Router } from '@shop-themes/router';
import { debounce, filter, tap } from 'rxjs/operators';

enum Pages {
  OVERVIEW = 'overview-page',
  ADDRESS_FORM = 'address-form',
  PAYMENT_FORM = 'payment-form'
}
@customElement('remi-checkout-overview')
export class CheckoutOverview extends useLightDom {
  @property({ type: Boolean })
  active = false;

  @property({ type: String })
  page = 'overview-page';

  @property({ type: Boolean })
  isLoading = true;

  @property({ type: Object })
  user: IUser;

  private readonly pages = Pages;
  private readonly userForm$ = new BehaviorSubject({});
  private dialog: MDCDialog;
  private userShowsIntent: Boolean;
  private shippingAddress;

  constructor() {
    super();
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
              <mwc-button @click=${this.goBack}>
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
              <div class="pages">
                <!-- Overview -->
                <section
                  class="overview-page"
                  ?active=${this.page === this.pages.OVERVIEW}
                >
                  <div class="layout horizontal center">
                    <p>If you have any troubles please contact our support.</p>
                    <span class="flex"></span>
                    <div>
                      <iron-icon icon="bn-icons:phone"></iron-icon>
                      8 800 505 04 83
                    </div>
                  </div>
                  <div class="wrapper">
                    ${this.user && this.user.isAnonymous
                      ? this.renderGeneralInfoForm()
                      : this.renderProfileSummary()}

                    <div class="layout horizontal center-center">
                      <h2>Shipping Address</h2>
                      <span class="flex"></span>
                    </div>

                    <!-- Show addresses here list here -->
                    ${this.user && this.renderAddresses()}

                    <section class="actions layout horizontal center-center">
                      <mwc-button
                        .disabled=${!this.canPlaceOrder}
                        raised
                        id="submit-button"
                        @click=${e => this.placeOrder(e)}
                      >
                        Place Order
                      </mwc-button>
                    </section>
                  </div>
                </section>
                <section
                  class="address-form"
                  ?active=${this.page === this.pages.ADDRESS_FORM}
                >
                  <remi-address-form
                    @submit=${this.addressAdd}
                  ></remi-address-form>
                </section>
                <!-- Show addresses here list here -->
                <h2>Payment Method</h2>
                <section
                  class="payment-form"
                  ?active=${this.page === this.pages.PAYMENT_FORM}
                >
                  ${this.userShowsIntent
                    ? html`
                        <remi-payment-form
                          shippingAddress=${this.shippingAddress}
                          @complete=${this.onCheckoutComplete}
                        ></remi-payment-form>
                      `
                    : ''}
                </section>
              </div>
            </main>
          </div>
        </div>
        <div class="mdc-dialog__scrim"></div>
      </div>
    `;
  }

  open() {
    this.dialog.open();
  }

  @property({ type: Boolean })
  get canPlaceOrder() {
    return this.user && this.shippingAddress;
  }

  async onCheckoutComplete({ detail: paymentResponse }) {
    await Cart.clear();
    Router.goTo('/home');
    this.dialog.close();
    location.reload();
  }

  /**
   *
   */
  protected firstUpdated() {
    import('./lazy-checkout').then(_ => {});
    this.dialog = new MDCDialog(this.querySelector('.mdc-dialog'));
    this.dialog.scrimClickAction = '';

    this.querySelectorAll('.mdc-text-field').forEach(
      item => new MDCTextField(item)
    );
    this.dialog.listen('MDCDialog:closing', () => {
      // Will destroy checkout if created
      this.userShowsIntent = false;
      this.requestUpdate();
    });

    this.updateUserInfo();
  }

  /**
   *
   */
  protected updateUserInfo() {
    this.userForm$
      .pipe(
        debounce(_ => timer(100)),
        filter((changes: any) => changes.email),
        tap(console.log)
      )
      .subscribe(async changes => {
        await Auth.update(changes);
      });
  }

  /**
   *
   * @param page
   */
  show(page) {
    this.setAttribute('page', page);
  }

  /**
   *
   * @param $event with address
   */
  async addressAdd({ detail: address }: { detail: IAddress }) {
    Auth.addAdress(address);
    this.show(this.pages.OVERVIEW);
  }

  /**
   *
   * @param e
   */
  goBack(e) {
    this.page === this.pages.OVERVIEW
      ? this.dialog.close()
      : this.show(this.pages.OVERVIEW);
  }

  /**
   *
   * @param e
   */
  placeOrder(e) {
    this.userShowsIntent = this.userShowsIntent || true;
    this.show(this.pages.PAYMENT_FORM);
  }

  /**
   * We wont do this right now
   */
  renderProfileSummary(): TemplateResult {
    return html`
      <section></section>
    `;
  }

  /**
   *
   * @param $event
   */
  onAddressSelect({ detail }) {
    this.shippingAddress = detail.item.data;
    this.requestUpdate();
  }

  /**
   *
   */
  renderAddresses(): TemplateResult {
    const addresses = this.user.addresses || [];
    return html`
      <iron-selector
        class="addresses"
        @iron-select=${this.onAddressSelect}
        .items=${addresses}
        selected-attribute="selected"
      >
        ${addresses.map(
          address => html`
            <remi-address-item .data=${address}></remi-address-item>
          `
        )}
        <div
          class="add-address-btn layout vertical center-center"
          @click=${e => this.show(this.pages.ADDRESS_FORM)}
        >
          <span class="icon">${plusIcon}</span>
          Add Address
        </div>
      </iron-selector>
    `;
  }

  /**
   *
   */
  renderGeneralInfoForm(): TemplateResult {
    return html`
      <h2>General Information</h2>
      <form id="general-form">
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
              @change=${this.onInputChange}
              name="name"
              type="name"
              required
              value=""
              class="mdc-text-field__input"
            />
            <label class="mdc-floating-label" for="name">Your Name</label>
            <div class="mdc-line-ripple"></div>
          </div>
        </section>
        <section class="row">
          <div
            class="mdc-text-field text-field mdc-text-field--dense mdc-text-field--box mdc-text-field--with-leading-icon"
          >
            <iron-icon
              class="mdc-text-field__icon"
              icon="bn-icons:email"
            ></iron-icon>
            <input
              id="email"
              @change=${this.onInputChange}
              name="email"
              type="email"
              required
              value=""
              class="mdc-text-field__input"
            />
            <label class="mdc-floating-label" for="email">Email</label>
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
              id="phone"
              @change=${this.onInputChange}
              name="phone"
              type="text"
              pattern="\d{10,}"
              required
              value=""
              class="mdc-text-field__input"
            />
            <label class="mdc-floating-label" for="phone">Phone Number</label>
            <div class="mdc-line-ripple"></div>
          </div>
        </section>
      </form>
    `;
  }

  /**
   *
   * @param $event
   */
  onInputChange({ target }) {
    this.userForm$.next({
      ...this.userForm$.getValue(),
      [target['name']]: target.value
    });
  }
}
