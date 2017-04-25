const Type = require("./type");

module.exports = class Numlit {
    constructor(value) {
      this.value = value;
    }

    /* eslint-disable no-unused-vars*/
    analyze(context) {
        this.type = Type.INT;
    }
    /* eslint-enable */

    toString() {
        let numberString = "(numlit ";
            for (const numbers in this.value) {
                numberString += `${this.value[numbers]}`;
            }
            numberString += ")";
        return numberString;
    }
};
