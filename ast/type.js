module.exports = class Type {
    constructor(type) {
        this.type = type;
    }

    toString() {
        const typeString = `Type ${this.type}`;
        return typeString;
    }
};
