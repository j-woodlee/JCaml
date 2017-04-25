const Type = require("./type");

module.exports = class Charlit {
    constructor(value) {
        this.value = value;
    }

    /* eslint-disable no-unused-vars*/
    analyze(context) {
        this.type = Type.CHAR;
    }
    /* eslint-enable */

    toString() {
        return `(Charlit ${this.value})`;
    }
};
