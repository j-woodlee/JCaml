module.exports = class Block {
  constructor(stmt) {
    this.stmt = stmt;
  }

  toString() {
    let stmtString;
    for (const statements in this.stmt) {
      stmtString += `\n (Block ${this.stmt[statements]})`;
    }
    return stmtString;
  }
};
