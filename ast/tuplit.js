module.exports = class Tuplit {
    constructor(exp1, exp2) {
        this.exp1 = exp1;
        this.exp2 = exp2;
    }
    analyze(context) {
        this.exp1.analyze(context);
        this.exp1.analyze(context);
    }

    toString() {
        return `(Tuplit (${this.exp1}, ${this.exp2}))`;
    }
};
