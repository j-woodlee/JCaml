module.exports = class List {
  constructor(args) {
    this.args = args;
  }

  toString() {
    return `List ${this.args}`;
  }
};
