module.exports = class ExpBinary {
    constructor(op, exp, matchexp) {
        this.op = op;
        this.exp = exp;
        this.matchexp = matchexp;
    }

    analyze(context) {
        this.exp.analyze(context);
        this.matchexp.analyze(context);
    }

    toString() {
        return `(Exp_binary ${this.exp} ${this.op} ${this.matchexp})`;
    }
};
