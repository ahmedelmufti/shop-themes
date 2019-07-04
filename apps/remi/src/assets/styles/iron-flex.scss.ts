import { css } from 'lit-element';

export default css`
  .layout.horizontal,
  .layout.vertical {
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }

  .layout.horizontal {
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
  }

  .layout.vertical {
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
  }

  .layout.wrap {
    -ms-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
  }

  .layout.no-wrap {
    -ms-flex-wrap: nowrap;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
  }

  .layout.center,
  .layout.center-center {
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .layout.center-justified,
  .layout.center-center {
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .flex {
    -ms-flex: 1 1 0.000000001px;
    -webkit-flex: 1;
    flex: 1;
    -webkit-flex-basis: 0.000000001px;
    flex-basis: 0.000000001px;
  }

  /**
       * Alignment in cross axis.
       */

  .layout.start {
    -ms-flex-align: start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
  }

  .layout.center,
  .layout.center-center {
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .layout.end {
    -ms-flex-align: end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
  }

  .layout.baseline {
    -ms-flex-align: baseline;
    -webkit-align-items: baseline;
    align-items: baseline;
  }

  /**
    * Alignment in main axis.
    */

  .layout.start-justified {
    -ms-flex-pack: start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
  }

  .layout.center-justified,
  .layout.center-center {
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .layout.end-justified {
    -ms-flex-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
  }

  .layout.around-justified {
    -ms-flex-pack: distribute;
    -webkit-justify-content: space-around;
    justify-content: space-around;
  }

  .layout.justified {
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .flex,
  .flex-1 {
    -ms-flex: 1 1 0.000000001px;
    -webkit-flex: 1;
    flex: 1;
    -webkit-flex-basis: 0.000000001px;
    flex-basis: 0.000000001px;
  }

  .flex-2 {
    -ms-flex: 2;
    -webkit-flex: 2;
    flex: 2;
  }

  .block {
    display: block;
  }

  [hidden] {
    display: none !important;
  }

  .invisible {
    visibility: hidden !important;
  }

  .relative {
    position: relative;
  }

  .fit {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .scroll {
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }

  /* fixed position */

  .fixed-bottom,
  .fixed-left,
  .fixed-right,
  .fixed-top {
    position: fixed;
  }

  .fixed-top {
    top: 0;
    left: 0;
    right: 0;
  }

  .fixed-right {
    top: 0;
    right: 0;
    bottom: 0;
  }

  .fixed-bottom {
    right: 0;
    bottom: 0;
    left: 0;
  }

  .fixed-left {
    top: 0;
    bottom: 0;
    left: 0;
  }
`;
