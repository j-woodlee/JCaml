module.exports = class ParenExp {
  constructor(parenexp) {
    this.parenexp = parenexp;
  }

  toString() {
    return `(Parenexp (${this.parenexp}))`;
  }
};
