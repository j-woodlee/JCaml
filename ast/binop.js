module.exports = class Binop {
    constructor(op) {
        this.op = op;
    }

    toString() {
        return `(binop ${this.op})`;
    }
};
