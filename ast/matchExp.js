module.exports = class MatchExp {
    constructor(exp, matches) {
        this.exp = exp;
        this.matches = matches;
    }

    analyze(context) {
        this.exp.analyze(context);
        this.matches.forEach((match) => {
            match.analyze(context);
        });
    }

    toString() {
        return `(MatchExp match ${this.id} with ${this.matches})`;
    }
};
