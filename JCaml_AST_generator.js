fs = require('fs');
ohm = require('ohm-js');
parserContents = fs.readFileSync('JCaml.ohm');
JCamlGrammar = ohm.grammar(parserContents);

class Program {
    contructor(block) {
       this.block = block;
    }

    toString() {
        return '(Program ${this.block})';
    }
}

class Block {
    constructor(stmt) {
       this.stmt = stmt;
   }

   toString() {
       var stmtString;
       for(statements in stmt) {
            stmtString += '\n (Block ${this.stmt[statements]})';
        }
        return stmtString;
    }
}

class Stmt {
}

class ifStatement extends Stmt {
    constructor(exp, block, elseBlock, finalBlock) {
        this.exp = exp;
        this.block = block;
        this.elseBlock = elseBlock;
        this.finalBlock = finalBlock;
    }

    toString() {
        var ifString = '(ifStatement if ${this.exp} ${this.block})';
        for(blocks in elseBlock) {
            ifString += '\n (else if ${this.elseBlock[blocks]})';
        }
        ifString += '\n (else ${this.finalBlock})';
        return ifString;
    }
}

class Decl extends Stmt {
    constructor(id, exp) {
        this.id = id;
        this.exp = exp;
    }

    toString() {
        var declString = '(Decl let ${this.id} = ${this.exp})';
        return declString;
    }
}

class FuncDec extends Dec {
    constructor(id, params, returnType, body){
        this.id = id;
        this.params = params;
        this.body = body;
        this.returnType = returnType;
    }

    toString() {
        var funcDecString = 'FuncDec let fun ${this.id} = ${this.params} => ${this.returnType}: ${this.body}';
        return funcDecString;
    }
}

class Params{
    constructor(param, moreParams){
        this.param = param;
        this.moreParams = moreParams;
    }

    toString() {
        var paramsString = 'Params (${this.param}';
        for (params in moreParams) {
            paramsString += ', ${params}';
        }
        paramsString += ')';
        return paramsString;
    }
}

class Param{
    constructor(id){
        this.id = id;
    }

    toString() {
        var paramString = 'Param ${this.id}';
        return paramString;
    }
}

class ReturnType{
    constructor(id){
        this.id = id;
    }

    toString() {
        var returnTypeString = 'ReturnType ${this.id}';
        return returnTypeString;
    }
}

class Body {
    constructor(block) {
        this.block = block;
    }

    toString() {
        var bodyString = '(Body :${this.block};;)';
        return bodyString;
    }
}

class Exp {
}

class MatchExp extends Exp{
    constructor(id, matches) {
        this.id = id;
        this.matches = matches;
    }

    toString() {
        return '(MatchExp match ${this.id} with \n ${this.matches})';

    }
}

class BinExp extends Exp {
    constructor(binexp, op, addexp){
        this.binexp = binexp;
        this.op = op;
        this.addexp = addexp;
    }

    toString() {
        return '(BinExp ${this.binexp} ${this.op} ${this.addexp})';
    }
}

class AddExp extends Exp {
    constructor(addexp, op, mullexp) {
        this.addexp = addexp;
        this.op = op;
        this.mullexp = mullexp;
    }

    toString() {
        return '(AddExp ${this.addexp} ${this.op} ${this.mullexp})';
    }
}

class MullExp extends Exp {
    constructor(mullexp, op, prefixexp) {
        this.mullexp = mullexp;
        this.op = op;
        this.prefixexp = prefixexp;
    }

    toString() {
        return '(Mullexp ${this.mullexp} ${this.op} ${this.prefixexp})';
    }
}

class PrefixExp extends Exp {
    constructor(op, expoexp) {
        this.op = op;
        this.expoexp;
    }

    toString() {
        return '(Prefixexp ${this.op} ${this.expoexp})';
    }
}

class ExpoExp extends Exp {
    constructor(parenexp, op, expoexp) {
        this.parenexp = prenexp;
        this.op = op;
        this.expoexp = expoexp;
    }

    toString() {
        return '(Expoexp ${this.Parenexp} ${this.op} ${this.Expoexp})';
    }
}

class ParenExp extends Exp {
    constructor(parenexp) {
        this.parenexp = parenexp;
    }

    toString() {
        return '(Parenexp (${this.parenexp}))';
    }
}

class Matches {
    constructor(exp1, exp2) {
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    toString() {
        return '(Matches | ${this.exp1} -> ${this.exp2} \n)';
    }
}

class Tuplit {
    constructor(exp1, exp2) {
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    toString() {
        return '(Tuplit (${this.exp1}, ${this.exp2}))';
    }
}

class List {
    constructor(exp1, exp2){
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    toString() {
        var listString = '(List [${this.exp1}';
        for(exps in exp2) {
            listString += ', ${this.exp2[exps]}';
        }
        listString += ')]';
        return listString;
    }
}

class Numlit {
    constructor(value) {
        this.value = value;
    }
    toString() {
        var numberString = '(Numlit ';
        for(numbers in value) {
            numberString += '${this.value[numbers]}';
        }
        numberString += ')';
        return numberString;
    }
}

class Charlit {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return '(Charlit ${this.value})'
    }
}

class Stringlit {
    constructor(value) {
        this.value = value;
    }
    toString() {
        var charString = '(Stringlit ';
        for(lit in value) {
            charString += '${this.value[lit]}';
        }
        charString += ')';
        return charString;
    }
}

const semantics = JCamlGrammar.createSemantics().addOperation('tree', {
    Program(block) {return new Program(block.tree());},
    Block(stmt) {return new Block(stmt.tree());},
    Statement_ifElse(exp, block, elseBlock, finalBlock) {return new Statement_ifElse(exp.tree(), block.tree(), elseBlock.tree(), finalBlock.tree());},
    Decl(id, exp) {return new Decl(id.tree(), exp.tree());}
    FuncDec(id, params, returnType, body) {return new FuncDec(id.tree(), params.tree(), returnType.tree(), body.tree());}
    Params(param, moreParams) {return new Params(param.tree(), moreParams.tree());}
    Param(id) {return new Param(id.tree());}
    ReturnType(id) {return new ReturnType(id.tree());}
    Body(block) {return new Body(block.tree());}
    BinExp(binexp, op, addexp) {return new BinExp(binexp.tree(), op.tree(), addexp.tree());}
    AddExp(addexp, op, mullexp) {return new AddExp(addexp.tree(), op.tree(), mullexp.tree());}
    MullExp(mullexp, op, prefixexp) {return new MullExp(mullexp.tree(), op.tree(), prefixexp.tree());}
    PrefixExp(op, expoexp) {return new PrefixExp(op.tree(), expoexp.tree());}
    ExpoExp(parenexp, op, expoexp) {return new ExpoExp(parenexp.tree(), op.tree(), expoexp.tree());}
    ParenExp(parenexp) {return new Parenexp(parenexp.tree());}
    Matches(exp1, exp2) {return new Matches(exp1.tree(), exp2.tree());}
    Tuplit(exp1, exp2) {return new Tuplit(exp1.tree(), exp2.tree());}
    List(exp1, exp2) {return new List(exp1.tree(), exp2.tree());}
    Numlit(value) {return new Numlit(value.tree());}
    Charlit(value) {return new Charlit(value.tree());}
    Stringlit(value) {return new Stringlit(value.tree());}
});
