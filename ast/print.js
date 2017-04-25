module.exports = class Print extends module.exports.Stmt {
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
