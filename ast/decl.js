const Stmt = require("../ast/stmt");

module.exports = class Decl extends Stmt {
    constructor(declaredType, id, exp) {
        super();
        this.declaredType = declaredType;
        this.id = id;
        this.exp = exp;
    }

    analyze(context) {
        this.exp.analyze(context);
        if (!this.declaredType.equals(this.exp.type)) {
            throw new Error("Declared type does not match the evaluated type.");
        }
        context.checkIfVariableIsAlreadyDeclared(this.id);
        context.addVariable(this.id, this.exp);
    }

    toString() {
        const declString = `(Decl let ${this.type} ${this.id} = ${this.exp})`;
        return declString;
    }
};
