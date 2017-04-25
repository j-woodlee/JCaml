module.exports = class Expop {
    constructor(op) {
        this.op = op;
    }

    toString() {
        return `(expop ${this.op})`;
    }
};
