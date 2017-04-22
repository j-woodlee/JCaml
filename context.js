
class Context {
  constructor() {
    this.parent = null;
    this.localVariables = Object.create(null);
    this.currentFunction = currentFunction;
    this.inLoop = inLoop;
  }

  createChildContextForFunctionBody(currentFunction) {
    // When entering a new function, we're not in a loop anymore
    return new Context({ parent: this, currentFunction, inLoop: false });
  }

  createChildContextForLoop() {
    // When entering a loop body, just set the inLoop field, retain others
    return new Context({ parent: this, currentFunction: this.currentFunction, inLoop: true });
  }

  createChildContextForBlock() {
    // Retain function and loop setting
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: this.inLoop,
    });
  }

  addVariable(entity) {
    if (entity.id in this.localVariables) {
      throw new Error(`Identitier ${entity.id} already declared in this scope`);
    }
    this.localVariables[entity.id] = entity;
  }

  isPresent(id) {
    if (id in this.localVariables) {
      return true;
    }
    return false;
  }

  lookup(id) {
    if (id in this.localVariables) {
      return this.localVariables[id];
    } else if (this.parent === null) {
      throw new Error(`Identifier ${id} has not been declared`);
    } else {
      return this.parent.lookup(id);
    }
  }

  assertInFunction(message) {
    if (!this.currentFunction) {
      throw new Error(message);
    }
  }

  assertIsFunction(entity) { // eslint-disable-line class-methods-use-this
    if (entity.constructor !== FunctionDeclaration) {
      throw new Error(`${entity.id} is not a function`);
    }
  }
}

Context.INITIAL = new Context();
new FunctionDeclaration("print", [new Parameter("_", null)], null).analyze(Context.INITIAL);
new FunctionDeclaration("sqrt", [new Parameter("_", null)], null).analyze(Context.INITIAL);

module.exports = Context;
