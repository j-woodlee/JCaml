// const Context = require("../analyzer");

module.exports = class Program {
  contructor(block) {
    this.block = block;
  }

  toString() {
    return `(Program ${this.block})`;
  }
};
