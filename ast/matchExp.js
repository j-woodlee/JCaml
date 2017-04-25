module.exports = class MatchExp {
    constructor(id, matches) {
        this.id = id;
        this.matches = matches;
    }

    analyze(context) {
        // this.id.analyze(context);
        this.matches.forEach((match) => {
            match.analyze(context);
        });
    }

    toString() {
        return `(MatchExp match ${this.id} with ${this.matches})`;
    }
};
