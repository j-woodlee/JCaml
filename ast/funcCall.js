module.exports = class FuncCall extends module.exports.Stmt {
  constructor(id, args) {
    super();
    this.id = id;
    this.args = args;
  }

  toString() {
    return `(funcCall ${this.id} ($this.args))`;
  }
};
