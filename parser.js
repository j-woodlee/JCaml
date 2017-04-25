const fs = require("fs");

const ohm = require("ohm-js");

const parserContents = fs.readFileSync("JCaml.ohm");
const Context = require("./context.js");

const JCamlGrammar = ohm.grammar(parserContents);


class Type {
    constructor(type) {
        this.type = type;
    }

    toString() {
        const typeString = `Type ${this.type}`;
        return typeString;
    }
}

Type.INT = new Type("int");
Type.FLOAT = new Type("float");
Type.STRING = new Type("string");
Type.BOOL = new Type("bool");
Type.CHAR = new Type("char");


class Program {
    constructor(block) {
        this.block = block;
    }

    analyze(context = Context.INITIAL) {
        this.block.analyze(context);
    }

    toString() {
        return `(Program ${this.block})`;
    }
}

class Block {
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
}

class Stmt {
}

class StatementIfElse extends Stmt {
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
}

class Decl extends Stmt {
    constructor(declaredType, id, exp) {
        super();
        this.declaredType = declaredType;
        this.id = id;
        this.exp = exp;
    }

    analyze(context) {
        this.exp.analyze(context);
        if (this.declaredType !== this.exp.type) {
            throw new Error("Declared type does not match the evaluated type.");
        }
        context.checkIfVariableIsAlreadyDeclared(this.id);
        context.addVariable(this.id, this.exp);
        this.declaredType.analyze(context);
        this.id.analyze(context);
    }

    toString() {
        const declString = `(Decl let ${this.type} ${this.id} = ${this.exp})`;
        return declString;
    }
}

class FuncDec extends Stmt {
    constructor(id, params, returnType, body) {
        super();
        this.id = id;
        this.params = params;
        this.body = body;
        this.returnType = returnType;
    }

    analyze(context) {
        this.id.analyze(context);
        context.checkIfVariableIsAlreadyDeclared(this.id);

        const localContext = context.createChildContextForFunctionBody(this);
        this.params.forEach((param) => {
            // duplicate parameter check
            localContext.checkIfVariableIsAlreadyDeclared(param.id);
            param.analyze(localContext);
            localContext.addVariable(param.id, param);
        });

        this.returnType.analyze(context);
        this.body.analyze(localContext);
        this.type = this.returnType;
        context.addVariable(this.id, this);
    }

    toString() {
        const funcDecString = `FuncDec let fun ${this.id} = ${this.params} => ${this.returnType} : ${this.body}`;
        return funcDecString;
    }
}

class Print extends Stmt {
    constructor(argument) {
        super();
        this.argument = argument;
    }

    analyze(context) {
        this.argument.analyze(context);
    }

    toString() {
        return `(Print (${this.argument}))`;
    }
}

class Return extends Stmt {
    constructor(argument) {
        super();
        this.argument = argument;
    }

    analyze(context) {
        this.argument.analyze(context);
        context.assertInFunction("Return statement outside function.");
        context.assertTypeMatchesFunctionReturnType(this.argument);
    }

    toString() {
        return `(Return ${this.argument})`;
    }

    gen() {
        if (this.returnValue) {
            // emit(`return ${this.returnValue.gen()};`);
        } else {
            // emit('return;');
        }
    }
}


class FuncCall extends Stmt {
    constructor(id, args) {
        super();
        this.id = id;
        this.args = args;
    }

    analyze(context) {
        context.lookupVar(this.id);
        this.args.analyze(context);
    }

    toString() {
        return `(funcCall ${this.id} ($this.args))`;
    }
}

class Args {
    constructor(args) {
        this.args = args;
    }

    analyze(context) {
        this.args.forEach((arg) => {
            arg.analyze(context);
        });
    }

    toString() {
        return `(Args ${this.args})`;
    }
}

class Arg {
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

    gen() {
        return this.expression.gen();
    }
}

class Params {
    constructor(params) {
        this.params = params;
    }

    toString() {
        let paramsString = "Params (";
        for (const params in this.params) {
            paramsString += `, ${params}`;
        }

        paramsString += ")";
        return paramsString;
    }
}

class Param {
    constructor(id) {
        this.id = id;
    }

    toString() {
        const paramString = `Param ${this.id}`;
        return paramString;
    }
}


class Body {
    constructor(block) {
        this.block = block;
    }

    analyze(context) {
        this.block.analyze(context);
    }

    toString() {
        const bodyString = `(Body :${this.block};;)`;
        return bodyString;
    }
}


class ExpBinary {
    constructor(op, exp, matchexp) {
        this.op = op;
        this.exp = exp;
        this.matchexp = matchexp;
    }

    analyze(context) {
        this.exp.analyze(context);
        this.matchexp.analyze(context);
    }

    toString() {
        return `(Exp_binary ${this.exp} ${this.op} ${this.matchexp})`;
    }
}

class ExpTernary {
    constructor(op, matchexp1, matchexp2, matchexp3) {
        this.matchexp1 = matchexp1;
        this.matchexp2 = matchexp2;
        this.matchexp3 = matchexp3;
    }

    analyze(context) {
        this.matchexp1.analyze(context);
        if (this.matchexp1.type !== Type.BOOL) {
            throw new Error("Ternary expression requires boolean as first argument.");
        }
        this.matchexp2.analyze(context);
        this.matchexp3.analyze(context);
    }

    toString() {
        return `(Exp_ternary ${this.matchexp1} ? ${this.matchexp2} : ${this.matchexp3})`;
    }
}

class MatchExp {
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
}

class BinExp {
    constructor(op, binexp, addexp) {
        this.op = op;
        this.binexp = binexp;
        this.addexp = addexp;
    }

    analyze(context) {
        this.binexp.analyze(context);
        this.addexp.analyze(context);
        if ((this.binexp.type !== Type.BOOL) || (this.addexp.type !== Type.BOOL)) {
            throw new Error(`Incompatible Types: Cannot use ${this.op} on ${this.binexp} and ${this.addexp}`);
        }
        this.type = Type.BOOL;
    }

    toString() {
        return `(BinExp ${this.binexp} ${this.op} ${this.addexp})`;
    }

    // gen() {
        // return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
    // }
 }

class AddExp {
    constructor(op, addexp, mullexp) {
        this.op = op;
        this.addexp = addexp;
        this.mullexp = mullexp;
    }

    analyze(context) {
        this.addexp.analyze(context);
        this.mullexp.analyze(context);
        if (this.addexp.type !== this.mullexp.type ||
            (this.addexp.type === Type.BOOL) || (this.mullexp.type === Type.BOOL)) {
            throw new Error("Incompatible types, cannot add.");
        }
        this.type = this.addexp.type; // can use addexp or mullexp to get type
    }

    toString() {
        return `(AddExp ${this.addexp} ${this.op} ${this.mullexp})`;
    }
}

class MullExp {
    constructor(op, mullexp, prefixexp) {
        this.op = op;
        this.mullexp = mullexp;
        this.prefixexp = prefixexp;
    }

    analyze(context) {
        this.mullexp.analyze(context);
        this.prefixexp.analyze(context);
        if ((this.mullexp.type !== this.prefixop.type) ||
            (this.mullexp.type === Type.STRING) ||
            (this.mullexp.type === Type.BOOL) ||
            (this.mullexp.type === Type.CHAR) ||
            (this.prefixexp.type === Type.STRING) ||
            (this.prefixexp.type === Type.BOOL) ||
            (this.prefixexp.type === Type.CHAR)) {
            throw new Error("Incompatible types, cannot Multiply.");
        }
        this.type = this.mullexp.type; // can use prefixexp or mullexp to get type
    }

    toString() {
        return `(Mullexp ${this.mullexp} ${this.op} ${this.prefixexp})`;
    }
}

class PrefixExp {
    constructor(op, expoexp) {
        this.op = op;
        this.expoexp = expoexp;
    }

    analyze(context) {
        this.expoexp.analyze(context);
    }

    toString() {
        return `(Prefixexp ${this.op} ${this.expoexp})`;
    }
}

class ExpoExp {
    constructor(op, parenexp, expoexp) {
        this.op = op;
        this.parenexp = parenexp;
        this.expoexp = expoexp;
    }

    analyze(context) {
        this.parenexp.analyze(context);
        this.expoexp.analyze(context);
        if ((this.parenexp.type !== this.expoexp.type) ||
            (this.parenexp.type === Type.STRING) ||
            (this.parenexp.type === Type.BOOL) ||
            (this.parenexp.type === Type.CHAR) ||
            (this.expoexp.type === Type.STRING) ||
            (this.expoexp.type === Type.BOOL) ||
            (this.expoexp.type === Type.CHAR)) {
            throw new Error("Incompatible types, cannot exponent.");
        }
        this.type = this.expoexp.type;
    }

    toString() {
        return `(Expoexp ${this.Parenexp} ${this.op} ${this.Expoexp})`;
    }
}

class ParenExp {
    constructor(addexp) {
        this.addexp = addexp;
    }

    analyze(context) {
        this.addexp.analyze(context);
        this.type = this.addexp.type;
    }

    toString() {
        return `(Parenexp (${this.addexp}))`;
    }
}

class Matches {
    constructor(exp1, exp2) {
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    // analyze(context) {
    // }

    toString() {
        return `(Matches | ${this.exp1} -> ${this.exp2})`;
    }
}

class Tuplit {
    constructor(exp1, exp2) {
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    toString() {
        return `(Tuplit (${this.exp1}, ${this.exp2}))`;
    }
}

class List {
    constructor(arg, args) {
        this.arg = arg;
        this.args = args;
    }

  toString() {
    return `(List ${this.arg} ${this.args})`;
  }
}

class Numlit {
    constructor(value) {
      this.value = value;
    }

    toString() {
        let numberString = "(numlit ";
            for (const numbers in this.value) {
                numberString += `${this.value[numbers]}`;
            }
            numberString += ")";
        return numberString;
    }

    gen() {
        return `${this.value}`;
    }
}

class Charlit {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return `(Charlit ${this.value})`;
    }
}

class Stringlit {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return `(stringlit ${this.value})`;
    }
}

class Addop {
    constructor(op) {
        this.op = op;
    }

    // analyze(context) {
    //     this.op.analyze(context);
    // }

    toString() {
        return `(addop ${this.op})`;
    }
}

class Relop {
    constructor(op) {
        this.op = op;
    }

    // analyze(context) {
    //     this.op.analyze(context);
    // }

    toString() {
        return `(relop ${this.op})`;
    }
}

class Mullop {
    constructor(op) {
        this.op = op;
    }

    // analyze(context) {
    //     this.op.analyze(context);
    // }

    toString() {
        return `(mullop ${this.op})`;
    }
}

class Expop {
    constructor(op) {
        this.op = op;
    }

    toString() {
        return `(expop ${this.op})`;
    }
}

class Binop {
    constructor(op) {
        this.op = op;
    }

    toString() {
        return `(binop ${this.op})`;
    }
}

/* eslint-disable no-unused-vars */
const semantics = JCamlGrammar.createSemantics().addOperation("tree", {
    Program(block) { return new Program(block.tree()); },
    Block(stmt) { return new Block(stmt.tree()); },
    Stmt_if(_1, exp, block, _2, elseIfExprs, elseIfBlocks, _3, finalBlock) {
        return new StatementIfElse(exp.tree(), block.tree(), elseIfExprs.tree(), finalBlock.tree());
    },
    Decl_decl(_1, type, id, _2, exp) { return new Decl(type.tree(), id.sourceString, exp.tree()); },
    Print_print(_1, _2, binexp, _3) { return new Print(binexp.tree()); },
    Return(_1, arg) { return new Return(arg.tree()); },
    addop(op) { return new Addop(this.sourceString); },
    relop(op) { return new Relop(this.sourceString); },
    mullop(op) { return new Mullop(this.sourceString); },
    expop(op) { return new Expop(this.sourceString); },
    binop(op) { return new Binop(this.sourceString); },
    FuncDec(_1, id, _2, params, _3, type, body) {
      return new FuncDec(id.sourceString, params.tree(), type.tree(), body.tree());
    },
    FuncCall(id, _1, args, _2) { return new FuncCall(id.sourceString, args.tree()); },
    Args(arg) { return new Args(arg.tree()); },
    Arg(id) { return new Arg(id.sourceString); },
    Params(_1, firstParam, _2, moreParams, _3) {
      return new Params([firstParam.tree()].concat(moreParams.tree()));
    },
    Param(id) { return new Param(id.sourceString); },
    Type(type) { return new Type(type.sourceString); },
    Body(_1, block, _2) { return new Body(block.tree()); },
    Exp_binary(exp, op, matchexp) { return new ExpBinary(op.tree(), exp.tree(), matchexp.tree()); },
    Exp_ternary(matchexp, _1, matchexp2, _2, matchexp3) {
      return new ExpTernary(matchexp.tree(), matchexp2.tree(), matchexp3.tree());
    },
    BinExp_binary(binexp, op, addexp) {
        return new BinExp(op.tree(), binexp.tree(), addexp.tree());
    },
    MatchExp_matchexp(_1, id, _2, matches) {
        return new MatchExp(id.sourceString, matches.tree());
    },
    AddExp_binary(addexp, op, mullexp) {
      return new AddExp(op.tree(), addexp.tree(), mullexp.tree());
    },
    MullExp_binary(mullexp, op, prefixexp) {
      return new MullExp(op.tree(), mullexp.tree(), prefixexp.tree());
    },
    PrefixExp_binary(op, expoexp) { return new PrefixExp(op.tree(), expoexp.tree()); },
    ExpoExp_binary(parenexp, op, expoexp) {
      return new ExpoExp(op.tree(), parenexp.tree(), expoexp.tree());
    },
    ParenExp_parens(_1, addexp, _2) { return new ParenExp(addexp.tree()); },
    Matches(_1, exp1, _2, exp2) { return new Matches(exp1.tree(), exp2.tree()); },
    Tuplit(_1, exp1, _2, exp2, _3) { return new Tuplit(exp1.tree(), exp2.tree()); },
    List_list(_1, _2, _3, _4, args) { return new List(this.sourceString); },
    List(_1) { return new List(this.sourceString); },
    numlit(value) { return new Numlit(this.sourceString); },
    charlit(_1, value, _2) { return new Charlit(this.sourceString); },
    stringlit(_1, value, _2) { return new Stringlit(this.sourceString); },
});
/* eslint-enable no-unused-vars */


function parse(text) {
    const match = JCamlGrammar.match(text);
    if (match.succeeded()) {
        return semantics(match).tree();
    }
    throw new Error(match.message);
}

module.exports = { parse, Program, Block, Stmt, Return, Arg, Param, Stringlit };
