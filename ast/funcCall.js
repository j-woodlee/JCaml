module.exports = class FuncCall extends Stmt {
  constructor(id, args) {
    this.id = id;
    this.args = args;
  }

  toString() {
    return `(funcCall ${this.id} ($this.args))`;
  }
}