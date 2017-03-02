const fs = require('fs');

const ohm = require('ohm-js');

const parserContents = fs.readFileSync('JCaml.ohm');
const JCamlGrammar = ohm.grammar(parserContents);

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
    let stmtString;
    for (const statements in this.stmt) {
      stmtString += '\n (Block ${this.stmt[statements]})';
    }
    return stmtString;
  }
}

class Stmt {
}

class StatementIfElse extends Stmt {
  constructor(exp, block, elseBlock, finalBlock) {
    super();
    this.exp = exp;
    this.block = block;
    this.elseBlock = elseBlock;
    this.finalBlock = finalBlock;
  }

  toString() {
    let ifString = '(ifStatement if ${this.exp} ${this.block})';
    for (const blocks in this.elseBlock) {
      ifString += '\n (else if ${this.elseBlock[blocks]})';
    }
    ifString += '\n (else ${this.finalBlock})';
    return ifString;
  }
}

class Decl extends Stmt {
  constructor(id, exp) {
    super();
    this.id = id;
    this.exp = exp;
  }

  toString() {
    const declString = '(Decl let ${this.id} = ${this.exp})';
    return declString;
  }
}

class Print extends Stmt {
  constructor(stringLit) {
    super();
    this.stringLit = stringLit;
  }

  toString() {
    return '(Print spit (${this.stringLit}))';
  }
}

class FuncDec extends Decl {
  constructor(id, params, returnType, body) {
    super(id);
    this.params = params;
    this.body = body;
    this.returnType = returnType;
  }

  toString() {
    const funcDecString = 'FuncDec let fun ${this.id} = ${this.params} => ${this.returnType}: ${this.body}';
    return funcDecString;
  }
}

class Params {
  constructor(param, moreParams) {
    this.param = param;
    this.moreParams = moreParams;
  }

  toString() {
    let paramsString = 'Params (${this.param}';
    for (const params in this.moreParams) {
      paramsString += ', ${params}';
    }
    paramsString += ')';
    return paramsString;
  }
}

class Param {
  constructor(id) {
    this.id = id;
  }

  toString() {
    const paramString = 'Param ${this.id}';
    return paramString;
  }
}

class ReturnType {
  constructor(id) {
    this.id = id;
  }

  toString() {
    const returnTypeString = 'ReturnType ${this.id}';
    return returnTypeString;
  }
}

class Body {
  constructor(block) {
    this.block = block;
  }

  toString() {
    const bodyString = '(Body :${this.block};;)';
    return bodyString;
  }
}

class Exp {
}

class MatchExp extends Exp {
  constructor(id, matches) {
    super();
    this.id = id;
    this.matches = matches;
  }

  toString() {
    return '(MatchExp match ${this.id} with \n ${this.matches})';
  }
}

class BinExp extends Exp {
  constructor(binexp, op, addexp) {
    super();
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
    super();
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
    super();
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
    super();
    this.op = op;
    this.expoexp = expoexp;
  }

  toString() {
    return '(Prefixexp ${this.op} ${this.expoexp})';
  }
}

class ExpoExp extends Exp {
  constructor(parenexp, op, expoexp) {
    super();
    this.parenexp = parenexp;
    this.op = op;
    this.expoexp = expoexp;
  }

  toString() {
    return '(Expoexp ${this.Parenexp} ${this.op} ${this.Expoexp})';
  }
}

class ParenExp extends Exp {
  constructor(parenexp) {
    super();
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

class TupleElement {
  constructor(charlit, binexp) {
    this.charlit = charlit;
    this.binexp = binexp;
  }

  toString() {
    return '(TupleElement ${this.charlit})';
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

class List {}

class TupList extends List {
  constructor(tuplit1, tuplit2) {
    super();
    this.tuplit1 = tuplit1;
    this.tuplit2 = tuplit2;
  }

  toString() {
    let listString = '(TupList ${this.tuplit1}';
    for (const tuplits in this.tuplit2) {
      listString += ', ${this.tuplit2[tuplits]}';
    }
    listString += ')]';
    return listString;
  }
}

class CharList extends List {
  constructor(charlit1, charlit2) {
    super();
    this.charlit1 = charlit2;
    this.charlit2 = charlit2;
  }
  toString() {
    let listString = 'CharList ${this.charlit1}';
    for (const charlits in this.charlit2) {
      listString += ', ${this.charlit2[charlits]}';
    }
    listString += ')]';
    return listString;
  }
}

class NumList extends List {
  constructor(numlit1, numlit2) {
    super();
    this.numlit1 = numlit1;
    this.numlit2 = numlit2;
  }
  toString() {
    let numString = 'NumList ${this.numlit1}';
    for (const numlits in this.numlit2) {
      numString += ', ${this.numlit2[numlits]}';
    }
    numString += ')]';
    return numString;
  }
}

class StringList extends List {
  constructor(stringlit1, stringlit2) {
    super();
    this.stringlit1 = stringlit1;
    this.stringlit2 = stringlit2;
  }

  toString() {
    let listString = 'StringList ${this.stringlit1}';
    for (const stringlits in this.stringlit2) {
      listString += ', ${this.stringLis2[stringlits]}';
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
    let numberString = '(Numlit ';
    for (const numbers in this.value) {
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
    return '(Charlit ${this.value})';
  }
}

class Stringlit {
  constructor(value) {
    this.value = value;
  }
  toString() {
    let charString = '(Stringlit ';
    for (const lit in this.value) {
      charString += '${this.value[lit]}';
    }
    charString += ')';
    return charString;
  }
}

const semantics = JCamlGrammar.createSemantics().addOperation('tree', {
  Program(block) { return new Program(block.tree()); },
  Block(stmt) { return new Block(stmt.tree()); },
  StatementIfElse(exp, block, elseBlock, finalBlock) {
    return new StatementIfElse(exp.tree(), block.tree(), elseBlock.tree(), finalBlock.tree());
  },
  Decl(id, exp) { return new Decl(id.tree(), exp.tree()); },
  Print(stringLit) { return new Print(stringLit.tree()); },
  FuncDec(id, params, returnType, body) { return new FuncDec(id.tree(), params.tree(), returnType.tree(), body.tree()); },
  Params(param, moreParams) { return new Params(param.tree(), moreParams.tree()); },
  Param(id) { return new Param(id.tree()); },
  ReturnType(id) { return new ReturnType(id.tree()); },
  Body(block) { return new Body(block.tree()); },
  BinExp(binexp, op, addexp) { return new BinExp(binexp.tree(), op.tree(), addexp.tree()); },
  MatchExp(id, matches) { return new MatchExp(id.tree(), matches.tree()); },
  AddExp(addexp, op, mullexp) { return new AddExp(addexp.tree(), op.tree(), mullexp.tree()); },
  MullExp(mullexp, op, prefixexp) { return new MullExp(mullexp.tree(), op.tree(), prefixexp.tree()); },
  PrefixExp(op, expoexp) { return new PrefixExp(op.tree(), expoexp.tree()); },
  ExpoExp(parenexp, op, expoexp) { return new ExpoExp(parenexp.tree(), op.tree(), expoexp.tree()); },
  ParenExp(parenexp) { return new ParenExp(parenexp.tree()); },
  Matches(exp1, exp2) { return new Matches(exp1.tree(), exp2.tree()); },
  TupleElement(charlit, binexp) { return new TupleElement(charlit.tree(), binexp.tree()); },
  Tuplit(exp1, exp2) { return new Tuplit(exp1.tree(), exp2.tree()); },
  TupList(tuplit1, tuplit2) { return new TupList(tuplit1.tree(), tuplit2.tree()); },
  CharList(charlit1, charlit2) { return new CharList(charlit1.tree(), charlit2.tree()); },
  NumList(numlit1, numlit2) { return new NumList(numlit1.tree(), numlit2.tree()); },
  StringList(stringlit1, stringlit2) { return new StringList(stringlit1.tree(), stringlit2.tree()); },
  Numlit(value) { return new Numlit(value.tree()); },
  Charlit(value) { return new Charlit(value.tree()); },
  Stringlit(value) { return new Stringlit(value.tree()); },
});
