import { css } from 'lit-element';

export const style = css`
  /**
 * store.css
 * Stripe Payments Demo. Created by Romain Huet (@romainhuet).
 */

  * {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 15px;
    line-height: 1.4em;
    color: #525f7f;
  }

  /* Overall Container */

  #main {
    width: 100%;
    height: 100vh;
    text-align: center;
    transition: width 0.3s ease-in-out;
  }

  #main.checkout:not(.success):not(.error) {
    width: calc(100% - 450px);
  }

  /* Header */

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background: #fff url(/images/logo.svg) center center no-repeat;
    border-bottom: 1px solid #f3f3ff;
  }

  header a.shop,
  header a.github {
    margin: 30px;
    font-size: 13px;
    font-weight: 500;
    color: #666ee8;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    text-decoration: none;
  }

  header a.github {
    padding-left: 20px;
    background: url(/images/github.svg) left center no-repeat;
  }

  header a:hover {
    text-decoration: underline;
  }

  /* Checkout */

  #checkout {
    max-width: 480px;
    margin: 0 auto;
    padding: 0;
    /* visibility: hidden;
    opacity: 0; */
    transition: visibility 0s, opacity 0.5s linear 0.5s;
  }

  #main.checkout #checkout {
    /* visibility: visible; */
    opacity: 1;
  }

  section {
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: left;
  }

  h1 {
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 500;
  }

  h2 {
    margin: 15px 0;
    color: #32325d;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    font-size: 13px;
    font-weight: 500;
  }

  /* Payment Request */

  #payment-request {
    visibility: hidden;
    opacity: 0;
    padding: 0;
    transition: visibility 0s, opacity 0.3s ease-in;
  }

  #payment-request.visible {
    visibility: visible;
    opacity: 1;
  }

  #payment-form {
    margin: 0 -30px;
    padding: 20px 30px 30px;
    border-radius: 4px;
    border: 1px solid #e8e8fb;
  }

  /* Form */

  fieldset {
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.15),
      0 4px 6px 0 rgba(112, 157, 199, 0.15);
    border-radius: 4px;
    border: none;
    font-size: 0;
  }

  fieldset label {
    position: relative;
    display: flex;
    flex-direction: row;
    height: 42px;
    padding: 10px 0;
    align-items: center;
    justify-content: center;
    color: #8898aa;
    font-weight: 400;
  }

  fieldset label:not(:last-child) {
    border-bottom: 1px solid #f0f5fa;
  }

  fieldset label.state {
    display: inline-flex;
    width: 70%;
  }

  fieldset:not(.with-state) label.state {
    display: none;
  }

  fieldset label.zip {
    display: inline-flex;
    width: 25%;
    padding: 0;
  }

  fieldset:not(.with-state) label.zip {
    width: 100%;
  }

  fieldset label span {
    min-width: 120px;
    padding: 0 15px;
    text-align: right;
  }

  fieldset .redirect label span {
    width: 100%;
    text-align: center;
  }

  p.instruction {
    display: inline-table;
    margin-top: -32px;
    padding: 0 5px;
    text-align: center;
    background: #f8fbfd;
  }

  p.tip {
    margin: -10px auto 10px;
    padding: 5px 0 5px 30px;
    font-size: 14px;
    background: url(/images/tip.svg) left center no-repeat;
  }

  .field {
    flex: 1;
    padding: 0 15px;
    background: transparent;
    font-weight: 400;
    color: #31325f;
    outline: none;
    cursor: text;
  }

  .field::-webkit-input-placeholder {
    color: #aab7c4;
  }
  .field::-moz-placeholder {
    color: #aab7c4;
  }
  .field:-ms-input-placeholder {
    color: #aab7c4;
  }

  fieldset .select::after {
    content: '';
    position: absolute;
    width: 9px;
    height: 5px;
    right: 20px;
    top: 50%;
    margin-top: -2px;
    background-image: url(/images/dropdown.svg);
    pointer-events: none;
  }

  input {
    flex: 1;
    border-style: none;
    outline: none;
    color: #313b3f;
  }

  select {
    flex: 1;
    border-style: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    color: #313b3f;
    cursor: pointer;
    background: transparent;
  }

  select:focus {
    color: #666ee8;
  }

  ::-webkit-input-placeholder {
    color: #cfd7e0;
  }
  ::-moz-placeholder {
    color: #cfd7e0;
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: #cfd7e0;
  }

  input:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-text-fill-color: #666ee8;
    transition: background-color 100000000s;
    -webkit-animation: 1ms void-animation-out 1s;
  }

  .StripeElement--webkit-autofill {
    background: transparent !important;
  }

  #card-element {
    margin-top: -1px;
  }

  #ideal-bank-element {
    padding: 0;
  }

  button {
    display: block;
    background: #666ee8;
    color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    border: 0;
    font-weight: 700;
    width: 100%;
    height: 40px;
    outline: none;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  button:focus {
    background: #555abf;
  }

  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, 0.08);
  }

  button:active {
    background: #43458b;
  }

  #country {
    display: flex;
    align-items: center;
  }

  #country select {
    margin: 0 -15px 0 -30px;
    padding: 0 15px 0 30px;
  }

  #country::before {
    display: inline-flex;
    content: '';
    width: 21px;
    height: 15px;
    background: url(/images/flags.svg);
    background-position: -1000px -1000px;
    background-repeat: no-repeat;
    margin-right: 10px;
  }

  #country.at::before {
    background-position: -165px -10px;
  }
  #country.au::before {
    background-position: -196px -10px;
  }
  #country.be::before {
    background-position: -227px -10px;
  }
  #country.br::before {
    background-position: -351px -10px;
  }
  #country.ca::before {
    background-position: -382px -10px;
  }
  #country.ch::before {
    background-position: -475px -10px;
  }
  #country.cn::before {
    background-position: -41px -35px;
  }
  #country.de::before {
    background-position: -134px -35px;
  }
  #country.dk::before {
    background-position: -196px -35px;
  }
  #country.es::before {
    background-position: -320px -35px;
  }
  #country.eu::before {
    background-position: -351px -35px;
  }
  #country.fi::before {
    background-position: -382px -35px;
  }
  #country.fr::before {
    background-position: -413px -35px;
  }
  #country.gb::before {
    background-position: -475px -35px;
  }
  #country.hk::before {
    background-position: -41px -60px;
  }
  #country.ie::before {
    background-position: -196px -60px;
  }
  #country.it::before {
    background-position: -351px -60px;
  }
  #country.jp::before {
    background-position: -444px -60px;
  }
  #country.lu::before {
    background-position: -258px -85px;
  }
  #country.mx::before {
    background-position: -475px -85px;
  }
  #country.nl::before {
    background-position: -103px -110px;
  }
  #country.no::before {
    background-position: -134px -110px;
  }
  #country.nz::before {
    background-position: -165px -110px;
  }
  #country.pt::before {
    background-position: -413px -110px;
  }
  #country.se::before {
    background-position: -103px -135px;
  }
  #country.sg::before {
    background-position: -134px -135px;
  }
  #country.us::before {
    background-position: -475px -135px;
  }

  /* Payment Methods */

  #payment-methods {
    margin: 0 0 20px;
    border-bottom: 2px solid #e8e8fb;
  }

  #payment-methods li {
    display: none;
  }

  #payment-methods li.visible {
    display: inline-block;
    margin: 0 20px 0 0;
    list-style: none;
  }

  #payment-methods input {
    display: none;
  }

  #payment-methods label {
    display: flex;
    flex: 1;
    cursor: pointer;
  }

  #payment-methods input + label {
    position: relative;
    padding: 5px 0;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 13px;
  }

  #payment-methods label::before {
    content: '';
    position: absolute;
    width: 100%;
    bottom: -2px;
    left: 0;
    border-bottom: 2px solid #6772e5;
    opacity: 0;
    transform: scaleX(0);
    transition: all 0.25s ease-in-out;
  }

  #payment-methods label:hover {
    color: #6772e5;
    cursor: pointer;
  }

  #payment-methods input:checked + label {
    color: #6772e5;
  }

  #payment-methods label:hover::before,
  #payment-methods input:checked + label::before {
    opacity: 1;
    transform: scaleX(1);
  }

  #payment-methods,
  .payment-info {
    display: none;
  }

  .payment-info:not(.card) {
    margin-bottom: 15px;
  }

  .payment-info.ideal {
    margin-bottom: 0;
  }

  #payment-methods.visible,
  .payment-info.visible {
    display: block;
  }

  .payment-info.card.visible,
  .payment-info.sepa_debit.visible {
    text-align: center;
  }

  .payment-info p.notice {
    font-size: 14px;
    color: #8898aa;
    text-align: left;
  }

  #wechat-qrcode img {
    margin: 0 auto;
  }

  .element-errors {
    display: inline-flex;
    height: 20px;
    margin: 15px auto 0;
    padding-left: 20px;
    color: #e25950;
    opacity: 0;
    transform: translateY(10px);
    transition-property: opacity, transform;
    transition-duration: 0.35s;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    background: url(/images/error.svg) center left no-repeat;
    background-size: 15px 15px;
  }

  .element-errors.visible {
    opacity: 1;
    transform: none;
  }

  #iban-errors {
    margin-top: -20px;
  }

  /* Order Summary */

  #summary {
    position: fixed;
    top: 0;
    right: -450px;
    bottom: 0;
    width: 450px;
    overflow: auto;
    height: 100%;
    background: #fff;
    box-shadow: 0 2px 19px 4px rgba(0, 0, 0, 0.04);
    transition: right 0.3s ease-in-out;
  }

  #main.checkout:not(.success):not(.error) + #summary {
    right: 0;
  }

  #summary header {
    background: #fff;
  }

  #summary h1 {
    margin: 0 30px;
    line-height: 80px;
    font-weight: 400;
  }

  #summary p {
    font-size: 16px;
    font-weight: 400;
    margin-top: 10px;
  }

  #summary .discount p {
    margin-top: 0;
  }

  #summary .line-item {
    display: flex;
    flex-direction: row;
    padding: 30px 30px 0 30px;
  }

  #summary .line-item .image {
    display: block;
    width: 80px;
    height: 80px;
    margin-right: 15px;
    background: #f6f9fc;
    border-radius: 3px;
  }

  #summary .line-item .label {
    flex: 1;
    text-align: left;
  }

  #summary .line-item .product {
    color: #424770;
  }

  #summary .line-item .sku {
    font-size: 14px;
    color: #8898aa;
  }

  #summary .line-item .count,
  #summary .line-item .price {
    font-size: 14px;
    padding-left: 10px;
    align-self: right;
    text-align: right;
    line-height: 24px;
  }

  #summary .line-item .count {
    color: #8898aa;
  }

  #summary .line-item .price {
    color: #8ba4fe;
    font-weight: bold;
  }

  #summary .line-item.subtotal {
    margin-top: 30px;
    margin-bottom: 0;
    padding-top: 10px;
    border-top: 1px solid #f3f3ff;
  }

  #summary .line-item.shipping {
    padding-top: 0;
  }

  #summary .line-item.total {
    margin-top: 15px;
    margin-bottom: 30px;
    padding-top: 15px;
    font-size: 21px;
    border-top: 1px solid #f3f3ff;
  }

  #summary .line-item.total .label,
  #summary .line-item.total .price {
    color: #424770;
    font-size: 24px;
    font-weight: 400;
    line-height: inherit;
  }

  #demo {
    padding: 15px;
    margin: -15px -15px 0;
    background: #f6f9fc;
    border-radius: 5px;
  }

  #demo p.label {
    margin: 0 0 10px;
    color: #666ee8;
  }

  #demo .note {
    display: block;
    margin: 10px 0 0;
    font-size: 14px;
  }

  #demo p.note a,
  #demo p.note em {
    font-size: 14px;
  }

  #demo p.note a:hover {
    text-decoration: none;
  }

  .card-number {
    padding-left: 8px;
    white-space: nowrap;
    font-family: Source Code Pro, monospace;
    color: #0d2b3e;
    font-weight: 500;
  }

  .card-number span {
    display: inline-block;
    width: 8px;
  }

  /* Order Confirmation */

  #confirmation {
    display: flex;
    align-items: center;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    visibility: hidden;
    overflow-x: hidden;
    opacity: 0;
    background: #f8fbfd;
    text-align: left;
    transition: visibility 0s, opacity 0.5s linear 0.5s;
  }

  #main.success #confirmation,
  #main.error #confirmation {
    visibility: visible;
    opacity: 1;
  }

  #main.success #order,
  #main.error #order {
    visibility: hidden;
    opacity: 0;
  }

  #confirmation h1 {
    font-size: 42px;
    font-weight: 300;
    color: #6863d8;
    letter-spacing: 0.3px;
    margin-bottom: 30px;
  }

  #confirmation .status {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 75px 0 275px;
    max-width: 75%;
    height: 350px;
    margin: 100px auto;
    background: #fff url(/images/order.svg) 75px center no-repeat;
    box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.15);
    border-radius: 6px;
  }

  #confirmation .status.error {
    display: none;
  }

  #confirmation .status p {
    margin: 0 0 15px;
  }

  #confirmation .status li {
    margin-bottom: 5px;
    list-style: none;
  }

  #main.success:not(.processing) #confirmation .status.processing,
  #main.success:not(.receiver) #confirmation .status.receiver {
    display: none;
  }

  #main.processing #confirmation .status.success,
  #main.receiver #confirmation .status.success {
    display: none;
  }

  #main.error #confirmation .status.success,
  #main.error #confirmation .status.processing,
  #main.error #confirmation .status.receiver {
    display: none;
  }

  #main.error #confirmation .status.error {
    display: flex;
  }

  #main.error #confirmation .error-message {
    font-family: monospace;
  }

  /* Media Queries */

  @media only screen and (max-width: 1024px) {
    #main.checkout:not(.success):not(.error) {
      width: calc(100% - 320px);
    }
    #summary {
      width: 320px;
      right: -320px;
    }
    #main.checkout:not(.success):not(.error) + #summary {
      right: 0;
    }
    #summary .line-item p {
      margin-top: 0;
    }
    #summary .line-item .image {
      width: 40px;
      height: 40px;
    }
    #summary .line-item .label {
      margin: 0;
    }
  }

  @media only screen and (max-width: 800px) {
    #main.checkout:not(.success):not(.error) {
      width: 100%;
    }
    #payment-request {
      padding-top: 0;
      min-height: 80px;
    }
    #summary {
      display: none;
    }
    #confirmation .status {
      width: auto;
      height: auto;
      margin: 30px;
    }
  }

  @media only screen and (max-width: 500px) {
    header {
      height: 60px;
      background-size: 40px 40px;
    }
    header a.shop,
    header a.github {
      display: none;
    }
    #payment-request {
      min-height: 0;
      padding-right: 15px;
      padding-left: 15px;
    }
    #payment-form {
      margin: 0;
      padding: 0;
      border-width: 2px 0 0 0;
      border-radius: 0;
    }
    .payment-info span {
      display: none;
    }
    fieldset {
      margin-bottom: 15px;
    }
    fieldset label.state,
    fieldset label.zip {
      display: flex;
      padding: 10px 0;
      width: auto;
    }
    p.instruction {
      margin-top: -12px;
      font-size: 14px;
    }
    p.tip {
      margin-bottom: 0;
      font-size: 13px;
    }
    #country::before {
      display: none;
    }
    #checkout {
      margin-bottom: 0;
    }
    #confirmation .status {
      width: auto;
      height: auto;
      padding: 120px 15px 15px;
      background: #fff url(/images/order.svg) center 15px no-repeat;
      background-size: 68px 86px;
      box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.15);
      border-radius: 6px;
    }
    #confirmation h1 {
      text-align: center;
    }
  }
`;
