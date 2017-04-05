module.exports = class BinExp {
  constructor(op, binexp, addexp) {
    this.op = op;
    this.binexp = binexp;
    this.addexp = addexp;
  }

  toString() {
    return `(BinExp ${this.binexp} ${this.op} ${this.addexp})`;
  }
}