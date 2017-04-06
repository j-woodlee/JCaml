module.exports = class Args {
  constructor(args) {
    this.args = args;
  }

  toString() {
    return `(Args ${this.args})`;
  }
};
