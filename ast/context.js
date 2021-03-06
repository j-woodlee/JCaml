const FuncDec = require("../ast/funcDec");
const Parameter = require("../ast/param");
const Type = require("./type");
const Body = require("./body");
const Block = require("./block");
const Return = require("./return");
const StringLit = require("./stringLit");

class Context {
    constructor({ parent = null, currentFunction = null } = {}) {
        this.parent = parent;
        this.localVariables = Object.create(null);
        this.currentFunction = currentFunction;
    }

    createChildContextForFunctionBody(currentFunction) {
        // When entering a new function, we're not in a loop anymore
        return new Context({ parent: this, currentFunction });
    }

    assertTypeMatchesFunctionReturnType(arg) {
        if (arg.type !== this.currentFunction.returnType) {
            throw new Error("Return value does not match current function's declared return type.");
        }
        return 0;
    }

    createChildContextForBlock() {
        return new Context({ parent: this, currentFunction: this.currentFunction });
    }

    addVariable(id, entity) {
        if (id in this.localVariables) {
            throw new Error(`Identitier ${entity.id} already declared in this scope`);
        }
        this.localVariables[id] = entity;
    }

    lookupVar(id) {
        if (id in this.localVariables) {
            return this.localVariables[id];
        } else if (this.parent === null) {
            throw new Error(`Identifier ${id} has not been declared`);
        } else {
            return this.parent.lookupVar(id);
        }
    }

    assertInFunction(message) {
        if (!this.currentFunction) {
            throw new Error(message);
        }
    }

    hasBeenDeclared(id) {
        if (this.localVariables[id]) {
            return true;
        } else if (this.parent !== null) {
            return this.parent.hasBeenDeclared(id);
        }
        return false;
    }

    checkIfVariableIsAlreadyDeclared(id) {
        if (this.localVariables[id]) {
            throw new Error(`Variable ${id} already declared`);
        }
        if (this.parent !== null) {
            return this.parent.checkIfVariableIsAlreadyDeclared(id);
        }
        return 0;
    }


  // assertIsFunction(entity) { // eslint-disable-line class-methods-use-this
  //   if (entity.constructor !== FunctionDeclaration) {
  //     throw new Error(`${entity.id} is not a function`);
  //   }
  // }
}

Context.INITIAL = new Context();
new FuncDec("print", [new Parameter("test")], Type.STRING,
    new Body(new Block([new Return(new StringLit("test-string"))])))
    .analyze(Context.INITIAL);  // id, params, returntype, body


module.exports = Context;
