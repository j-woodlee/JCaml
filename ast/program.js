const Context = require("./context");

module.exports = class Program {
    constructor(block) {
        this.block = block;
    }

    analyze(context = Context.INITIAL) {
        this.block.analyze(context);
    }

    toString() {
        return `(Program ${this.block})`;
    }

    optimize() {
      this.block.optimize();
      return this;
    }
};
