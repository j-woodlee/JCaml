const Decl = require("../ast/decl");

module.exports = class FuncDec extends Decl {
    constructor(id, params, returnType, body) {
        super();
        this.id = id;
        this.params = params;
        this.body = body;
        this.returnType = returnType;
    }

    analyze(context) {
        context.checkIfVariableIsAlreadyDeclared(this.id);
        const localContext = context.createChildContextForFunctionBody(this);
        this.params.forEach((param) => {
            // duplicate parameter check
            localContext.checkIfVariableIsAlreadyDeclared(param.id);
            // param.analyze(localContext);
            localContext.addVariable(param.id, param);
        });

        this.returnType.analyze(context);
        this.body.analyze(localContext);
        this.type = this.returnType;
        context.addVariable(this.id, this);
    }

    toString() {
        const funcDecString = `FuncDec let fun ${this.id} = ${this.params} => ${this.returnType} : ${this.body}`;
        return funcDecString;
    }
};
