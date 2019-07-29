// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

// Supported payment methods for the store.
// Some payment methods support only a subset of currencies.
// Make sure to check the docs: https://stripe.com/docs/sources
const paymentMethods = [
  // 'ach_credit_transfer', // usd (ACH Credit Transfer payments must be in U.S. Dollars)
  //'alipay', // aud, cad, eur, gbp, hkd, jpy, nzd, sgd, or usd.
  //'bancontact', // eur (Bancontact must always use Euros)
  'card' // many (https://stripe.com/docs/currencies#presentment-currencies)
  // 'eps', // eur (EPS must always use Euros)
  // 'ideal', // eur (iDEAL must always use Euros)
  // 'giropay', // eur (Giropay must always use Euros)
  // 'multibanco', // eur (Multibanco must always use Euros)
  // 'sepa_debit', // Restricted. See docs for activation details: https://stripe.com/docs/sources/sepa-debit
  // 'sofort', // eur (SOFORT must always use Euros)
  // 'wechat' // aud, cad, eur, gbp, hkd, jpy, sgd, or usd.
];

// Shipping options for the Payment Request API.
const shippingOptions = [
  {
    id: 'free',
    label: 'Free Shipping',
    detail: 'Delivery within 5 days',
    amount: 0
  },
  {
    id: 'express',
    label: 'Express Shipping',
    detail: 'Next day delivery',
    amount: 500
  }
];

// Environment
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCo-dZOVaM_ZzNgbTNxptrPnSB086hZMgo',
    authDomain: 'reminiscebyro-b534f.firebaseapp.com',
    databaseURL: 'https://reminiscebyro-b534f.firebaseio.com',
    projectId: 'reminiscebyro-b534f',
    storageBucket: 'reminiscebyro-b534f.appspot.com',
    messagingSenderId: '644416860629',
    appId: '1:644416860629:web:b73b23539e9f15d7'
  },
  shop: {
    shippingOptions: shippingOptions,
    apiURL: 'localhost:3333/api',
    country: 'US',
    currency: 'usd'
  },
  payment: {
    // API version to set for this app (Stripe otherwise uses your default account version).
    apiKey: 'pk_test_pGKvBsZKXXUoqZ2l1eMKeuC7',
    apiVersion: '2019-03-14',
    publishableKey: '',
    paymentMethods: paymentMethods
  }
};
