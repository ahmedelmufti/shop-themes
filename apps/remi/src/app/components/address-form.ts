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
import { MDCTextField } from '@material/textfield';
import { useLightDom } from '../use-lightdom';

@customElement('remi-address-form')
export class AddressForm extends useLightDom {
  @property({ type: Boolean })
  active = false;

  protected render() {
    return html`
      <form id="address-form">
        <section class="row">
          <div
            class="mdc-text-field text-field mdc-text-field--dense mdc-text-field--box mdc-text-field--with-leading-icon"
          >
            <iron-icon
              class="mdc-text-field__icon"
              icon="bn-icons:email"
            ></iron-icon>
            <input
              id="address"
              name="address"
              type="text"
              required
              value=""
              class="mdc-text-field__input"
            />
            <label class="mdc-floating-label" for="address">Address</label>
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
              id="city"
              name="city"
              type="text"
              required
              value=""
              class="mdc-text-field__input"
            />
            <label class="mdc-floating-label" for="city">City</label>
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
              id="state"
              name="state"
              type="state"
              required
              value=""
              class="mdc-text-field__input"
            />
            <label class="mdc-floating-label" for="state">State/Province</label>
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
              type="text"
              required
              value=""
              class="mdc-text-field__input"
            />
            <label class="mdc-floating-label" for="name">Zip/Postal Code</label>
            <div class="mdc-line-ripple"></div>
          </div>
        </section>
      </form>

      <footer>
        <mwc-button @click=${this.submit}>Save</mwc-button>
      </footer>
    `;
  }

  protected firstUpdated() {
    this.querySelectorAll('.mdc-text-field').forEach(
      item => new MDCTextField(item)
    );
  }

  protected submit(e) {
    const form: HTMLFormElement = this.querySelector('#address-form');
    if (form.reportValidity()) {
      const data = Object.fromEntries(new FormData(form).entries());
      this.dispatchEvent(new CustomEvent('submit', { detail: data }));
    }
  }
}
