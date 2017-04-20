//const Context = require("../context");

module.exports = class Program {
  contructor(block) {
    this.block = block;
  }

  toString() {
    return `(Program ${this.block})`;
  }

//  analyze(context = Context.INITIAL) {
//    this.block.analyze(context);
//  }
};
