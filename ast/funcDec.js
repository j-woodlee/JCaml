module.exports = class FuncDec extends module.exports.Decl {
  constructor(id, params, returnType, body) {
    super(id);
    this.params = params;
    this.body = body;
    this.returnType = returnType;
  }

  toString() {
    const funcDecString = `FuncDec let fun ${this.id} = ${this.params} => ${this.returnType}: ${this.body}`;
    return funcDecString;
  }
};
