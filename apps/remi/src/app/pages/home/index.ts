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

@customElement('remi-home')
export class Home extends useLightDom {
  @property({ type: Boolean })
  active = false;

  private latestProducts$: Observable<any>;

  @property({ type: Array })
  latest = [];

  protected render() {
    return html`
      <div class="page-wrapper">
        <section class="app-hero pad">
          <div class="content layout horizontal center-center app-hero-content">
            <div class="hero-content pad flex fade">
              <h1 class="mdc-typography--headline2">
                <biness-text>Adu Matte Liquid Lipstick</biness-text>
              </h1>
              <p class="mdc-typography--body2">
                <biness-text
                  >Senses is the smart sleep tracker that improves your sleep,
                  wakes you up feeling great, and shoes how the envirnment of
                  your room affects yourrest.</biness-text
                >
              </p>
              <div class="call-action-wrapper center">
                <a href="/shop">
                  <mwc-button outlined class="accent-btn">
                    <biness-text>Shop Now </biness-text>
                  </mwc-button>
                </a>
              </div>
            </div>
            <div class="hero-media hidden-on-small pad flex">
              <div class="some-component fade slide-right"></div>
            </div>
          </div>
        </section>

        <section
          class="app-section content layout horizontal center highlight-product pad"
        >
          <div class="media fade slide-left">
            <iron-image
              sizing="cover"
              preload
              src="/assets/images/banner.jpeg"
            ></iron-image>
          </div>
          <span class="flex"></span>
          <div class="pad">
            <h1 class="mdc-typography--headline3 fade">
              <biness-text>Beauty in real Life</biness-text>
            </h1>
            <p class="mdc-typography--body2 fade">
              <biness-text
                >Create colorful dimension from cheeks to eyes to
                templates.</biness-text
              >
            </p>
            <a href="/shop">
              <mwc-button style="margin: 2em 0" outlined class="accent-btn">
                <biness-text>Shop Now</biness-text>
              </mwc-button>
            </a>
          </div>
        </section>

        <section class="app-section feature" style="padding-bottom: 4em;">
          <div class="content">
            <div class="center heading-wrapper pad">
              <h1 class="mdc-typography--headline5">Latest</h1>
            </div>
            <div class="feature-grid">
              ${this.latest.map(
                product => html`
                  <a href="/product/${product.$key}" class="feature-item">
                    <remi-product-item
                      class="fade"
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

        <section class="app-section" style="height: 70vh; position: relative;">
          <iron-image
            style="width:100%; height:100%; background-color: lightgray;"
            sizing="cover"
            preload
            fade
            src="/assets/images/pexels-photo-457704.jpeg"
          ></iron-image>
          <div class="layout vertical center-center bottom-banner-info fit">
            <div class="title mdc-typography--headline5 fade">
              <small style="font-size:18px">NEW!</small>
              <br />Matte Liquid Lipstick
            </div>
            <div
              class="mdc-typography--body fade"
              style="padding: 0 24px;text-align: center;"
            >
              Stunning Metalic Look that Touch Glow Skin Tone you love.
            </div>
            <a href="/shop">
              <mwc-button class="white-btn" outlined>
                Shop Now
              </mwc-button>
            </a>
          </div>
        </section>
      </div>
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
      this.latest = products.slice(0, 6);
    });
  }
}
