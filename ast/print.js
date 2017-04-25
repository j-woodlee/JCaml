const Stmt = require("../ast/stmt");

module.exports = class Print extends Stmt {
    constructor(argument) {
        super();
        this.argument = argument;
    }

    analyze(context) {
        this.argument.analyze(context);
    }

    toString() {
        return `(Print (${this.argument}))`;
    }
};
