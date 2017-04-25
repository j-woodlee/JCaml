module.exports = class Print extends module.exports.Stmt {
  constructor(binexp) {
    super();
    this.binexp = binexp;
  }

  toString() {
    return `(Print spit (${this.binexp}))`;
  }
};
