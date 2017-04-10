module.exports = class PrefixExp {
  constructor(op, expoexp) {
    this.op = op;
    this.expoexp = expoexp;
  }

  toString() {
    return `(Prefixexp ${this.op} ${this.expoexp})`;
  }
};
