module.exports = class List {
    constructor(arg) {
        this.args = arg;
    }

    toString() {
        return `(List ${this.arg})`;
    }
};
