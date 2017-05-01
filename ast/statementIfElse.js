const Type = require("../ast/type");
const Stmt = require("../ast/stmt");

Type.INT = new Type("int");
Type.FLOAT = new Type("float");
Type.STRING = new Type("string");
Type.BOOL = new Type("bool");
Type.CHAR = new Type("char");

module.exports = class StatementIfElse extends Stmt {
    constructor(ifExpression, ifBlock, elseIfExpressions, elseIfBlocks, elseBlock) {
        super();
        this.ifExpression = ifExpression;
        this.ifBlock = ifBlock;
        this.elseIfExpressions = elseIfExpressions;
        this.elseIfBlocks = elseIfBlocks;
        this.elseBlock = elseBlock;
    }

    analyze(context) {
        if (!(this.ifExpression.type === Type.BOOL)) {
            throw new Error("Type Error: If statement conditional must be a bool.");
        }
        this.ifBlock.analyze(context);

        if (this.elseIfExpressions) {
            this.elseIfExpressions.forEach((expression) => {
                expression.analyze(context);
                if (!(expression.type === Type.BOOL)) {
                    throw new Error("Type Error: If statement conditional must be a bool.");
                }
            });
        }
        if (this.elseIfBlocks) {
            this.elseIfBlocks.forEach((block) => {
                block.analyze(context);
            });
        }

        if (this.elseBlock) {
            this.elseBlock.analyze(context);
        }
    }
    toString() {
        let ifString = `(ifStatement if ${this.ifExpression} ${this.ifBlock})`;
        if (this.elseIfExpressions) {
            for (let i = 1; i <= this.elseIfExpressions.length; i += 1) {
                ifString += `\n (else if ${this.elseIfExpressions})`;
                ifString += `\n (${this.elseIfBlocks})`;
            }
        }

        ifString += `\n (else ${this.elseBlock})`;
        return ifString;
    }
};
