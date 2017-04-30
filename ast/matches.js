module.exports = class Matches {
    constructor(firstMatch, restMatches) {
        this.firstMatch = firstMatch;
        this.restMatches = restMatches;
    }

    analyze(context) {
        this.firstMatch.analyze(context);
        this.restMatches.forEach((match) => {
            match.analyze(context);
        });
    }

    toString() {
        return `(Matches ${this.firstMatch} ${this.restMatches})`;
    }
};
