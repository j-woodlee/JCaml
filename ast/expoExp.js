module.exports = class ExpoExp {
  constructor(op, parenexp, expoexp) {
    this.op = op;
    this.parenexp = parenexp;
    this.expoexp = expoexp;
  }

  toString() {
    return `(Expoexp ${this.Parenexp} ${this.op} ${this.Expoexp})`;
  }
};
