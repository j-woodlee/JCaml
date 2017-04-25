module.exports = class Arg {
    constructor(id) {
        this.id = id;
    }

    toString() {
      return `(Arg ${this.id})`;
    }

    analyze(context) {
        // check if id is in the context
        context.lookupVar(this.id);
    }
};
