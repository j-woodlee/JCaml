module.exports = class Matches {
    constructor(restMatches) {
        this.restMatches = restMatches;
    }

    analyze(context) {
        this.firstMatch.analyze(context);
        this.restMatches.forEach((match) => {
            match.analyze(context);
        });
    }

    toString() {
        return `(Matches ${this.restMatches})`;
    }
};
