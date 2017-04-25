module.exports = class List {
    constructor(arg, args) {
        this.arg = arg;
        this.args = args;
    }

    toString() {
        return `(List ${this.arg} ${this.args})`;
    }
};
