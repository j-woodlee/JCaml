module.exports = class Decl extends Stmt {
  constructor(id, exp) {
    this.id = id;
    this.exp = exp;
  }

  toString() {
    const declString = `(Decl let ${this.id} = ${this.exp})`;
    return declString;
  }
}