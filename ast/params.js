module.exports = class Params {
    constructor(params) {
        this.params = params;
    }

    toString() {
        return `(Params ${this.params})`;
    }
};
