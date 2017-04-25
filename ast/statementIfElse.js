const Type = require("../ast/type");
const Stmt = require("../ast/stmt");

Type.INT = new Type("int");
Type.FLOAT = new Type("float");
Type.STRING = new Type("string");
Type.BOOL = new Type("bool");
Type.CHAR = new Type("char");

module.exports = class StatementIfElse extends Stmt {
    constructor(expressions, blocks) {
        super();
        this.expressions = expressions;
        this.blocks = blocks;
    }

    analyze(context) {
        this.expressions.forEach((expression) => {
            expression.analyze(context);
            if (!(expression.type === Type.BOOL)) {
                throw new Error("Type Error: If statement conditional must be a bool.");
            }
        });

        this.blocks.forEach((block) => {
            block.analyze(context);
        });
    }
    toString() {
        let ifString = `(ifStatement if ${this.exp} ${this.block})`;
        for (const exps in this.exp2) {
            ifString += `\n (else if ${this.exp2[exps]})`;
        }
        for (const blocks in this.elseBlock) {
            ifString += `\n (${this.elseBlock[blocks]})`;
        }
        ifString += `\n (else ${this.finalBlock})`;
        return ifString;
    }
};
