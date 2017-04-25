module.exports = class Stringlit {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return `(stringlit ${this.value})`;
    }
};
