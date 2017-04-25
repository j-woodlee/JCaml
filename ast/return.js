module.exports = class Return {
    constructor(argument) {
        this.argument = argument;
    }

    analyze(context) {
        this.argument.analyze(context);
        context.assertInFunction("Return statement outside function.");
        context.assertTypeMatchesFunctionReturnType(this.argument);
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
