module.exports = class Block {
    constructor(statements) {
        this.statements = statements;
    }

    analyze(context) {
        this.statements.forEach((s) => {
            s.analyze(context);
        });
    }

    toString() {
        let stmtString;
        for (const s in this.statements) {
            stmtString += `\n (Block ${this.statements[s]})`;
        }
        return stmtString;
    }

    optimize() {
        this.statements.map(s => s.optimize()).filter(s => s != null);
        return this;
    }
};
