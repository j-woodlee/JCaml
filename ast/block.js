module.exports = class Block {
  constructor(stmts) {
    this.stmts = stmts;
  }

  toString() {
    let stmtString;
    for (const statements in this.stmt) {
      stmtString += `\n (Block ${this.stmt[statements]})`;
    }
    return stmtString;
  }

  analyze(context) {
    this.stmts.forEach(s => s.analyze(context));
  }
};
