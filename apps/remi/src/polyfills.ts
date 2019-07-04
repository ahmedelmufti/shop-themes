/**
 * This file contains polyfills loaded on all browsers
 **/

// Needed on browsers with native `customElements`.
// (E.g.: Chrome, Opera)
import '@webcomponents/custom-elements/src/native-shim.js';

// Needed for browsers without native `customElements`.
// (E.g.: Edge, Firefox, IE, Safari)
import '@webcomponents/custom-elements/custom-elements.min.js';
