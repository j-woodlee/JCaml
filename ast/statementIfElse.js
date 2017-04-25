module.exports = class StatementIfElse extends module.exports.Stmt {
  constructor(exp, block, elseBlock, exp2, finalBlock) {
    super();
    this.exp = exp;
    this.block = block;
    this.elseBlock = elseBlock;
    this.exp2 = exp2;
    this.finalBlock = finalBlock;
  }

  toString() {
    let ifString = `(ifStatement if ${this.exp} ${this.block})`;
    for (const exps in this.exp2) {
      ifString += `\n (else if ${this.exp2[exps]})`;
    }
    for (const blocks in this.elseBlock) {
      ifString += `\n (${this.elseBlock[blocks]})`;
    }
    ifString += `\n (else ${this.finalBlock})`;
    return ifString;
  }
};
