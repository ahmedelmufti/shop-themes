/**
 * This file contains polyfills loaded on all browsers
 **/

if (!window['customElements']) {
  import('node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce.js').then();
}
