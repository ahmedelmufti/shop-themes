/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, property, customElement } from 'lit-element';
import { useLightDom } from '../../use-lightdom';

import '@polymer/iron-selector/iron-selector.js';
import '../../../assets/styles/textfield.scss';

import './style.scss';

@customElement('remi-auth')
export class AuthOverview extends useLightDom {
  @property({ type: Boolean })
  active = false;

  protected render() {
    return html`
      <section class="page-wrapper">
        <iron-selector .items=${[]} selected="0" selected-attribute="page">
          <section class="" page="login"></section>
          <section class="" page="register"></section>
        </iron-selector>
      </section>
    `;
  }
}
