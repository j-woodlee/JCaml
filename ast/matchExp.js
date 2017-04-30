module.exports = class MatchExp {
    constructor(id, matches) {
        this.id = id;
        this.matches = matches;
    }

    analyze(context) {
        if (!context.hasBeenDeclared(this.id)) {
            throw new Error(`${this.id} has not been declared.`);
        }

        this.matches.forEach((match) => {
            match.analyze(context);
        });
    }

    toString() {
        return `(MatchExp match ${this.id} with ${this.matches})`;
    }
};
