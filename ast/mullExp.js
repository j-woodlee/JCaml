module.exports = class MullExp {
  constructor(op, mullexp, prefixexp) {
    this.op = op;
    this.mullexp = mullexp;
    this.prefixexp = prefixexp;
  }

  toString() {
    return `(Mullexp ${this.mullexp} ${this.op} ${this.prefixexp})`;
  }
}