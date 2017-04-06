module.exports = class ExpTernary {
  constructor(op, matchexp1, matchexp2, matchexp3) {
    this.matchexp1 = matchexp1;
    this.matchexp2 = matchexp2;
    this.matchexp3 = matchexp3;
  }

  toString() {
    return `(Exp_ternary ${this.matchexp1} ? ${this.matchexp2} : ${this.matchexp3})`;
  }
};
