module.exports = class Param {
    constructor(id) {
        this.id = id;
    }

    toString() {
        const paramString = `Param ${this.id}`;
        return paramString;
    }
};
