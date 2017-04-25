module.exports = class Relop {
    constructor(op) {
        this.op = op;
    }

    // analyze(context) {
    //     this.op.analyze(context);
    // }

    toString() {
        return `(relop ${this.op})`;
    }
};
