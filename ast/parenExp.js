module.exports = class ParenExp {
    constructor(addexp) {
        this.addexp = addexp;
    }

    analyze(context) {
        this.addexp.analyze(context);
        this.type = this.addexp.type;
    }

    toString() {
        return `${this.addexp}`;
    }
};
