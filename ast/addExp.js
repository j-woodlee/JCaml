const Type = require("./type");

module.exports = class AddExp {
    constructor(op, addexp, mullexp) {
        this.op = op;
        this.addexp = addexp;
        this.mullexp = mullexp;
    }

    analyze(context) {
        this.addexp.analyze(context);
        this.mullexp.analyze(context);
        if (this.addexp.type !== this.mullexp.type ||
            (this.addexp.type === Type.BOOL) || (this.mullexp.type === Type.BOOL)) {
            throw new Error("Incompatible types, cannot add.");
        }
        this.type = this.addexp.type; // can use addexp or mullexp to get type
    }

    toString() {
        return `(AddExp ${this.addexp} ${this.op} ${this.mullexp})`;
    }
};
