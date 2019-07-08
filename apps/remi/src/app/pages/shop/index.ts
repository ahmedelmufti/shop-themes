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
import { useLightDom } from '../../use-lightdom';

// Components
import '@polymer/iron-image';
import '@material/mwc-button';
import '@shop-themes/editable-text';
import '../../components/product-item';

import './style.scss';
import { Shop } from '@shop-themes/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@customElement('remi-shop')
export class ShopPage extends useLightDom {
  @property({ type: Boolean })
  active = false;

  private latestProducts$: Observable<any>;

  @property({ type: Array })
  latest = [];

  protected render() {
    return html`
      <section class="app-section feature pad">
        <div class="content">
          <div class="center heading-wrapper">
            <h1 class="mdc-typography--headline5">Shop</h1>
          </div>

          <div class="feature-grid">
            ${this.latest.map(
              product => html`
                <a href="/product/${product.$key}" class="feature-item">
                  <remi-product-item
                    featured
                    .data=${product}
                  ></remi-product-item>
                </a>
              `
            )}
            <!-- Show loaders -->
            ${this.latest.length < 1 ? this.renderLoaders() : ''}
          </div>
        </div>
      </section>
    `;
  }

  renderLoaders() {
    return [1, 2, 3].map(
      _ => html`
        <div class="remi-product-item-placeholder feature-item">
          <div class="remi-product-item-placeholder--image"></div>
          <div class="remi-product-item-footer pad">
            <div
              class="remi-product-item-placeholder--title placeholder-shimmer"
            ></div>
            <div
              class="remi-product-item-placeholder--price placeholder-shimmer"
            ></div>
          </div>
        </div>
      `
    );
  }

  constructor() {
    super();
  }

  protected async firstUpdated() {
    await import('firebase/firestore');
    this.latestProducts$ = Shop.products()
      .latest(5)
      .pipe(filter(products => products.length > 0));
    this.latestProducts$.subscribe(products => {
      this.latest = products;
    });
  }
}
