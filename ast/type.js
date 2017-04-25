class Type {
    constructor(type) {
        this.type = type;
    }

    // analyze(context) {
    //
    // }

    toString() {
        const typeString = `Type ${this.type}`;
        return typeString;
    }
}

module.exports = Type;
Type.INT = new Type("int");
Type.FLOAT = new Type("float");
Type.STRING = new Type("string");
Type.BOOL = new Type("bool");
Type.CHAR = new Type("char");
