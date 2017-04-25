module.exports = class PrefixExp {
    constructor(op, expoexp) {
        this.op = op;
        this.expoexp = expoexp;
    }

    analyze(context) {
        this.expoexp.analyze(context);
    }

    toString() {
        return `(Prefixexp ${this.op} ${this.expoexp})`;
    }
};
