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
import { useLightDom } from '../use-lightdom';

import '@material/dialog/dist/mdc.dialog.css';
import './checkout-form.scss';

@customElement('remi-checkout-form')
export class CheckoutForm extends useLightDom {
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
              <button
                class="material-icons mdc-icon-button"
                aria-label="Download"
                data-mdc-dialog-action="no"
              >
                arrow_back
              </button>
              <div class="layout horizontal center-center">
                <div class="product-thumbnail">
                  <img
                    src="assets/images/icons/product-image-placeholder.png"
                  />
                </div>
                <div>
                  <h2 class="mdc-dialog__title">
                    <span>New Product</span>
                    <p class="sub-title">Product Detail</p>
                  </h2>
                </div>
              </div>

              <span class="flex"></span>

              <!-- Primary Actions -->
              <div class="actions layout horizontal center-center">
                <button
                  class="mdc-button mdc-button--dense button-with--icon"
                  disabled
                >
                  <i class="material-icons">visibility</i>
                  Preview
                </button>
                <button
                  class="mdc-button mdc-button--dense button-with--icon"
                  data-mdc-dialog-action="yes"
                >
                  <i class="material-icons">check</i>
                  Save
                </button>
              </div>
            </header>

            <div class="mdc-dialog__content" id="my-dialog-content"></div>
            <footer class="mdc-dialog__actions">
              <!-- <button
          type="button"
          class="mdc-button mdc-button--raised accent mdc-dialog__button"
          data-mdc-dialog-action="no"
        >
          <span class="mdc-button__label">Save</span>
        </button> -->
            </footer>
          </div>
        </div>
        <div class="mdc-dialog__scrim"></div>
      </div>
    `;
  }
}
