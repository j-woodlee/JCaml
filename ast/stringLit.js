const Type = require("./type");

module.exports = class Stringlit {
    constructor(value) {
        this.value = value;
    }
    /* eslint-disable no-unused-vars*/
    analyze(context) {
        this.type = Type.STRING;
    }
    /* eslint-enable */

    toString() {
        return `(stringlit ${this.value})`;
    }
};
