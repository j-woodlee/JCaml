const Type = require("./type");

module.exports = class Stringlit {
    constructor(value) {
        this.value = value;
    }
    analyze() {
        this.type = Type.STRING;
    }
    toString() {
        return `(stringlit ${this.value})`;
    }
};
