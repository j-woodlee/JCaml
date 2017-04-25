module.exports = class Mullop {
    constructor(op) {
        this.op = op;
    }

    // analyze(context) {
    //     this.op.analyze(context);
    // }

    toString() {
        return `(mullop ${this.op})`;
    }
};
