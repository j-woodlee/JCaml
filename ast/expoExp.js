const Type = require("../ast/type");

Type.INT = new Type("int");
Type.FLOAT = new Type("float");
Type.STRING = new Type("string");
Type.BOOL = new Type("bool");
Type.CHAR = new Type("char");

module.exports = class ExpoExp {
    constructor(op, parenexp, expoexp) {
        this.op = op;
        this.parenexp = parenexp;
        this.expoexp = expoexp;
    }

    analyze(context) {
        this.parenexp.analyze(context);
        this.expoexp.analyze(context);
        if ((this.parenexp.type !== this.expoexp.type) ||
            (this.parenexp.type === Type.STRING) ||
            (this.parenexp.type === Type.BOOL) ||
            (this.parenexp.type === Type.CHAR) ||
            (this.expoexp.type === Type.STRING) ||
            (this.expoexp.type === Type.BOOL) ||
            (this.expoexp.type === Type.CHAR)) {
            throw new Error("Incompatible types, cannot exponent.");
        }
        this.type = this.expoexp.type;
    }

    toString() {
        return `(Expoexp ${this.Parenexp} ${this.op} ${this.Expoexp})`;
    }
};
