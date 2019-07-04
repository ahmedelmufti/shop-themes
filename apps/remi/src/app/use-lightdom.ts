import { LitElement } from 'lit-element';

export const useLightDom = class extends LitElement {
  createRenderRoot() {
    return this;
  }
};
