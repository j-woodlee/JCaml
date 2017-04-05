module.exports = class Body {
  constructor(block) {
    this.block = block;
  }

  toString() {
    const bodyString = `(Body :${this.block};;)`;
    return bodyString;
  }
}