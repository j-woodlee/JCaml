module.exports = class Arg {
  constructor(id) {
    this.id = id;
  }

  toString() {
    return `(Arg ${this.id})`;
  }
};
