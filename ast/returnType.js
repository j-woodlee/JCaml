module.exports = class ReturnType {
  constructor(id) {
    this.id = id;
  }

  toString() {
    const returnTypeString = `ReturnType ${this.id}`;
    return returnTypeString;
  }
};
