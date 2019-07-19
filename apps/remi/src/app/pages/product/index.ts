/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {
  LitElement,
  html,
  css,
  PropertyValues,
  property,
  customElement,
  TemplateResult
} from 'lit-element';
import { useLightDom } from '../../use-lightdom';

import './style.scss';
import 'swiper/dist/css/swiper.min.css';
import { Router, RouteData } from '@shop-themes/router';
import { filter, switchMap, map, tap } from 'rxjs/operators';
import { Shop, Cart, Auth } from '@shop-themes/core';

@customElement('remi-product-detail')
export class ProductDetail extends useLightDom {
  @property({ type: Boolean })
  active = false;

  @property({ type: Object })
  data = null;

  private swiper;

  protected render() {
    return html`
      <section class="page-wrapper">
        <div style="
          height: 34px;
          background: #393433;
      "></div>
        <div class="content layout horizontal main-section" ?hidden=${!this
          .isEmpty}>
            <div class="product-media layout horizontal">
              <ul class="thumbnails no-carousel">
                ${this.product.media.map(
                  (item, index) => html`
                    <li>
                      <img
                        class="thumbnail-image"
                        .src=${item.downloadURL}
                        on-click="_swipeTo"
                        ?index=${index}
                      />
                    </li>
                  `
                )}
              </ul>
              <!-- Slider main container -->
                <div class="swiper-container">
                  <!-- Additional required wrapper -->
                  <ul class="swiper-wrapper" id="swipe">
                  ${this.product.media.map(
                    (item, index) => html`
                      <li class="swiper-slide">
                        <img class="product-image" .src=${item.downloadURL} />
                      </li>
                    `
                  )}
                  </ul>
                  <!-- If we need pagination -->
                  <!-- <div class="swiper-pagination"></div> -->

                  <!-- If we need navigation buttons -->
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>

                  <!-- If we need scrollbar -->
                  <!-- <div class="swiper-scrollbar"></div> -->
                </div>
            </div>
            <div class="detail layout vertical flex">
                <h1 class="mdc-typography--headline4">${this.product.name}</h1>
                <div class="price mdc-typography--headline6">$${
                  this.product.price.value
                }</div>
                <div class="pickers">
                    <!-- Color -->
                    <div class="colors-wrapper">
                        <h2 class="mdc-typography--body2 color-names">Colour: <span>Indigo</span>, <span>Pink</span></h2>
                        <remi-color-swatch-input></remi-color-swatch-input>
                    </div>
                    <div class="layout horizontal center">
                        <quantity-input min="1" max="7" value="{{quantity}}"></quantity-input>
                        <div class="flex">
                            <mwc-button class="mdc-button mdc-button--unelevated btn-add-cart" @click=${e =>
                              this.addToCart()}>
                                Add to Cart
                            </mwc-button>
                        </div>
                    </div>
                </div>
                <div class="description">
                    <h2 class="mdc-typography--headline5">Description</h2>
                    <p class="mdc-typography--body2">${this.product.description}
                        <div>
                            <br>
                        </div>
                        <div class="mdc-typography--headline5" ?hidden="${!this
                          .product.features}">Features:</div>
                        <div>
                            <ul>
                              ${this.getFeatures().map(
                                feature => html`
                                  <li>${feature}</li>
                                `
                              )}
                            </ul>
                        </div>
                    </p>
                </div>
            </div>
        </div>
        <!-- Will render loader here -->
        <div class="content layout loader horizontal main-section" ?hidden=${
          this.isEmpty
        }>
          ${this.loaderTemplate()}
        </div>
      </section>
    `;
  }

  protected loaderTemplate(): TemplateResult {
    return html`
      <div class="product-media">
        <div class="remi-product-item-placeholder--image"></div>
        <div class="remi-product-item-footer pad"></div>
      </div>
      <div class="detail layout vertical flex">
        <div
          class="remi-product-item-placeholder--title placeholder-shimmer"
        ></div>
        <div
          class="remi-product-item-placeholder--price placeholder-shimmer"
        ></div>
        <div class="description">
          <div
            class="remi-product-item-placeholder--title placeholder-shimmer"
          ></div>
          <div
            class="remi-product-item-placeholder--price placeholder-shimmer"
          ></div>
        </div>
        <div class="description">
          <div
            class="remi-product-item-placeholder--title placeholder-shimmer"
          ></div>
          <div
            class="remi-product-item-placeholder--price placeholder-shimmer"
          ></div>
        </div>
      </div>
    `;
  }

  getFeatures(): Array<String> {
    return this.data && this.data.features
      ? this.data.features.split('\n')
      : [];
  }

  get product() {
    return (
      this.data || {
        media: [],
        price: {}
      }
    );
  }

  get isEmpty(): Boolean {
    return this.product.$key;
  }

  /**
   *
   */
  protected async firstUpdated() {
    import('firebase/firestore').then(module => {
      Router.data$
        .pipe(
          filter(({ params }) => params[1] === 'product'),
          map((data: RouteData) => data.params[2]),
          switchMap(_slug => Shop.getProduct(_slug))
        )
        .subscribe(val => {
          this.data = val;
          this.requestSwiperUpdate();
        });
    });

    this.loadSwiper();
  }

  public async addToCart() {
    if (!Auth.user) {
      await Auth.loginAnonymously();
    }
    try {
      Cart.add({
        $key: this.data.$key,
        product: this.data,
        quantity: 1,
        price: this.data.price.value
      });
    } catch (error) {}
  }

  /**
   *
   */
  private requestSwiperUpdate() {
    if (!this.swiper) {
      this.loadSwiper();
    } else {
      this.updateComplete.then(_ => this.swiper.update());
    }
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('active')) {
      this.activeChanged(this.active);
    }
  }

  private activeChanged(active) {
    if (!active) {
      this.data = null;
    }
  }

  /**
   *
   */
  loadSwiper() {
    if (!this.product) return;
    import('swiper').then(({ default: Swiper }) => {
      this.swiper = new Swiper(this.querySelector('.swiper-container'), {
        slidesPerView: 1,
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });

      this.updateComplete.then(_ => this.swiper.update());
    });
  }
}
