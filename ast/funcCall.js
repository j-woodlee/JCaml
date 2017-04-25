const Stmt = require("../ast/stmt");

module.exports = class FuncCall extends Stmt {
    constructor(id, args) {
        super();
        this.id = id;
        this.args = args;
    }

    analyze(context) {
        context.lookupVar(this.id);
        this.args.analyze(context);
    }

    toString() {
        return `(funcCall ${this.id} ($this.args))`;
    }
};
