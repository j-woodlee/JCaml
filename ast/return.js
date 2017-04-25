const Stmt = require("./stmt");

module.exports = class Return extends Stmt {
    constructor(parenexp) {
        super();
        this.parenexp = parenexp;
    }

    analyze(context) {
        this.parenexp.analyze(context);
        context.assertInFunction("Return statement outside function.");
        context.assertTypeMatchesFunctionReturnType(this.parenexp);
    }

    toString() {
        return `(Return ${this.argument})`;
    }

    gen() {
        if (this.returnValue) {
            // emit(`return ${this.returnValue.gen()};`);
        } else {
            // emit('return;');
        }
    }
};
