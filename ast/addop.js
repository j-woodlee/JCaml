module.exports = class Addop {
    constructor(op) {
        this.op = op;
    }

    // analyze(context) {
    //     this.op.analyze(context);
    // }

    toString() {
        return `(addop ${this.op})`;
    }
};
