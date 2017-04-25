const Type = require("../ast/type");

Type.INT = new Type("int");
Type.FLOAT = new Type("float");
Type.STRING = new Type("string");
Type.BOOL = new Type("bool");
Type.CHAR = new Type("char");

module.exports = class MullExp {
    constructor(op, mullexp, prefixexp) {
        this.op = op;
        this.mullexp = mullexp;
        this.prefixexp = prefixexp;
    }

    analyze(context) {
        this.mullexp.analyze(context);
        this.prefixexp.analyze(context);
        if ((this.mullexp.type !== this.prefixop.type) ||
            (this.mullexp.type === Type.STRING) ||
            (this.mullexp.type === Type.BOOL) ||
            (this.mullexp.type === Type.CHAR) ||
            (this.prefixexp.type === Type.STRING) ||
            (this.prefixexp.type === Type.BOOL) ||
            (this.prefixexp.type === Type.CHAR)) {
            throw new Error("Incompatible types, cannot Multiply.");
        }
        this.type = this.mullexp.type; // can use prefixexp or mullexp to get type
    }

    toString() {
        return `(Mullexp ${this.mullexp} ${this.op} ${this.prefixexp})`;
    }
};
