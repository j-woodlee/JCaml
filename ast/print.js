const Stmt = require("../ast/stmt");

module.exports = class Print extends Stmt {
    constructor(binexp) {
        super();
        this.binexp = binexp;
    }

    analyze(context) {
        this.binexp.analyze(context);
    }

    toString() {
        return `(Print (${this.argument}))`;
    }
};
