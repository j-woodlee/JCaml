const Type = require("./type");

module.exports = class BinExp {
    constructor(op, binexp, addexp) {
        this.op = op;
        this.binexp = binexp;
        this.addexp = addexp;
    }

    analyze(context) {
        this.binexp.analyze(context);
        this.addexp.analyze(context);
        if ((this.binexp.type !== Type.BOOL) || (this.addexp.type !== Type.BOOL)) {
            throw new Error(`Incompatible Types: Cannot use ${this.op} on ${this.binexp} and ${this.addexp}`);
        }
        this.type = Type.BOOL;
    }

    toString() {
        return `(BinExp ${this.binexp} ${this.op} ${this.addexp})`;
    }
};
