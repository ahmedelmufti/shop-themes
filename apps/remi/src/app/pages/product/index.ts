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

import './style.scss';
import { Router, RouteData } from '@shop-themes/router';
import { filter, switchMap, map, tap } from 'rxjs/operators';
import { Shop } from '@shop-themes/core';

@customElement('remi-product-detail')
export class ProductDetail extends useLightDom {
  @property({ type: Boolean })
  active = false;

  @property({ type: Object })
  data = null;

  protected render() {
    return html`
      <section class="page-wrapper">
        ${this.data
          ? html`<div class="content layout horizontal main-section">
          <div style="
              height: 34px;
              background: #393433;
          "></div>
            <div class="product-media layout horizontal">
              <ul class="thumbnails no-carousel">
                <dom-repeat items="[[data.media]]" as="item" >
                  <template>
                    <li>
                      <img class="thumbnail-image" src$="[[item.downloadURL]]" on-click="_swipeTo" index="[[index]]">
                    </li>
                  </template>
                </dom-repeat>
              </ul>
              <!-- Slider main container -->
                <div class="swiper-container">
                  <!-- Additional required wrapper -->
                  <ul class="swiper-wrapper" id="swipe">
                    <template is="dom-repeat" items="[[data.media]]" as="item" on-dom-change="initSlider" notify-dom-change="true">
                      <li class="swiper-slide">
                        <img class="product-image" src="[[item.downloadURL]]">
                      </li>
                    </template>
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
                <h1 class="mdc-typography--headline4">${this.data.name}</h1>
                <div class="price mdc-typography--headline6">$${
                  this.data.price.value
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
                            <mwc-button class="mdc-button mdc-button--unelevated btn-add-cart" on-click="_addToCart">
                                Add to Cart
                            </mwc-button>
                        </div>
                    </div>

                </div>
                <div class="description">
                    <h2 class="mdc-typography--headline5">Description</h2>
                    <p class="mdc-typography--body2">${this.data.description}
                        <div>
                            <br>
                        </div>
                        <div class="mdc-typography--headline5" hidden$="[[!data.features]]">Features:</div>
                        <div>
                            <ul>
                                <template is="dom-repeat" items="[[_getFeatures(data.features)]]">
                                    <li>[[item]]</li>
                                </template>
                            </ul>
                        </div>
                    </p>
                </div>
                <!-- <shop-button responsive="">
                    <button aria-label="Add this item to cart">Add to Cart</button>
                </shop-button> -->
            </div>
        </div> `
          : ''}
      </section>
    `;
  }

  /**
   *
   */
  protected firstUpdated() {
    Router.data$
      .pipe(
        filter(({ params }) => params[1] === 'product'),
        map((data: RouteData) => data.params[2]),
        switchMap(_slug => Shop.getProduct(_slug))
      )
      .subscribe(val => {
        this.data = val;
        this.requestUpdate();
      });
  }
}