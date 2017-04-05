module.exports = class Print extends Stmt {
  constructor(binexp) {
    this.binexp = binexp;
  }

  toString() {
    return `(Print spit (${this.binexp}))`;
  }
}