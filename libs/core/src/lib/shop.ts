export const Shop = new class {
  constructor() {
    console.log('howdy i am shop module from core');
  }

  products() {
    return this;
  }

  latest(number: Number) {
    return this;
  }
}();
