module.exports = class Numlit {
    constructor(value) {
      this.value = value;
    }

    toString() {
        let numberString = "(numlit ";
            for (const numbers in this.value) {
                numberString += `${this.value[numbers]}`;
            }
            numberString += ")";
        return numberString;
    }
};
