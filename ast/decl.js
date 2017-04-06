module.exports = class Decl extends module.exports.Stmt {
  constructor(id, exp) {
    super();
    this.id = id;
    this.exp = exp;
  }

  toString() {
    const declString = `(Decl let ${this.id} = ${this.exp})`;
    return declString;
  }
};
