module.exports = class Charlit {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return `(Charlit ${this.value})`;
    }
};
