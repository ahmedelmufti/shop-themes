/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
`st-editable-text` is an element for displaying a text and allowing
 the text to be editable directly as it is previewed.

 - it has a placeholder property
 - it has a value property
 - it fires a change event
 -
Examples:
    <st-editable-text value="howdy" @change="dosomething()" placeholder="please enter something"></st-editable-text>
@demo demo/index.html
*/

import {
  LitElement,
  html,
  css,
  property,
  customElement,
  PropertyValues
} from 'lit-element';
import { fromEvent, Observable, timer, Subscription } from 'rxjs';
import { debounce } from 'rxjs/operators';

@customElement('biness-text')
export class EditableText extends LitElement {
  @property({ type: Boolean })
  active = false;

  @property({ type: Boolean })
  isEditable = false;

  @property({ type: String })
  placeholder = 'Enter Text';

  @property({ type: String })
  value = null;

  private _keyPressSub: Subscription;

  private input$: Observable<any>;

  static get styles() {
    return css`
      :host([contenteditable]) {
        outline: none;
      }
      :host {
        display: inline-block;
        cursor: text;
      }
    `;
  }

  /**
   *
   */
  get previewText() {
    return this.placeholder;
  }

  /**
   *
   */
  protected render() {
    return html`
      <slot></slot>
    `;
  }

  /**
   *
   */
  protected firstUpdated() {
    this.input$ = fromEvent(this, 'focusout').pipe(debounce(_ => timer(100)));
    this._keyPressSub = this.input$.subscribe(e => this.changed(e));
  }

  /**
   *
   * @param e
   */
  private changed(e) {
    this.dispatchEvent(
      new CustomEvent('change', { detail: { value: this.innerText } })
    );

    if (this.innerText.length === 0) {
      this.innerText = this.placeholder;
    }
  }

  /**
   *
   * @param changedProps
   */
  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('isEditable')) {
      this.toggleEditable();
    }
  }

  /**
   *
   */
  private toggleEditable() {
    this.isEditable
      ? this.setAttribute('contenteditable', '')
      : this.removeAttribute('contenteditable');
  }

  /**
   *
   */
  disconnectedCallback() {
    this._keyPressSub.unsubscribe();
  }
}
