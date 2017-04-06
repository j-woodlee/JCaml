module.exports = class MatchExp {
  constructor(id, matches) {
    this.id = id;
    this.matches = matches;
  }

  toString() {
    return `(MatchExp match ${this.id} with \n ${this.matches})`;
  }
};
