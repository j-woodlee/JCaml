module.exports = class List {
    constructor(arg) {
        this.arg = arg;
    }

    toString() {
        return `(List ${this.arg})`;
    }
};
