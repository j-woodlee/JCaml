class Type {
    constructor(type) {
        this.type = type;
    }

    toString() {
        const typeString = `Type ${this.type}`;
        return typeString;
    }
}

Type.INT = new Type("int");
Type.FLOAT = new Type("float");
Type.STRING = new Type("string");
Type.BOOL = new Type("bool");
Type.CHAR = new Type("char");

module.exports = Type;
