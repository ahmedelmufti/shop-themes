export const useLightDom = _base =>
  class extends _base {
    createRenderRoot() {
      return this;
    }
  };
