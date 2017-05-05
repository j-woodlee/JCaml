/*
 * Translation to JavaScript
 *
 * Requiring this module adds a gen() method to each of the AST classes.
 * Nothing is actually exported from this module.
 *
 * Generally, calling e.gen() where e is an expression node will return the
 * JavaScript translation as a string, while calling s.gen() where s is a
 * statement-level node will write its translation to standard output.
 *
 *   require("./backend/javascript-generator");
 *   program.gen();
 */
 // eslint-disable no-unused-vars

const Context = require("../ast/context");
const Program = require("../ast/program");
const Block = require("../ast/block");
const Return = require("../ast/return");
// const Stmt = require("../ast/stmt");
const Argument = require("../ast/arg");
const Arguments = require("../ast/args");
const StringLiteral = require("../ast/stringLit");
const FuncCall = require("../ast/funcCall");
const AddExp = require("../ast/addExp");
const BinExp = require("../ast/binExp");
const Body = require("../ast/body");
const CharLit = require("../ast/charLit");
const Decl = require("../ast/decl");
const ExpBinary = require("../ast/exp_binary");
const ExpTernary = require("../ast/exp_ternary");
const ExpoExp = require("../ast/expoExp");
const ParenExp = require("../ast/parenExp");
const FuncDec = require("../ast/funcDec");
const List = require("../ast/list");
// const Matches = require("../ast/matches");
const MullExp = require("../ast/mullExp");
const NumLit = require("../ast/numLit");
const Param = require("../ast/param");
const Params = require("../ast/params");
const PrefixExp = require("../ast/prefix_Exp");
const Print = require("../ast/print");
const StatementIfElse = require("../ast/statementIfElse");
const TupLit = require("../ast/tuplit");
const Type = require("../ast/type");
const MatchExp = require("../ast/matchExp");

const indentPadding = 2;
let indentLevel = 0;

function emit(line) {
  console.log(`${" ".repeat(indentPadding * indentLevel)}${line}`);
}

function genStatementList(statements) {
  indentLevel += 1;
  statements.forEach(statement => statement.gen());
  indentLevel -= 1;
}

function makeOp(op) {
  return { not: "!", and: "&&", or: "||", "==": "===", "!=": "!==" }[op] || op;
}

// jsName(e) takes any PlainScript object with an id property, such as a
// Variable, Parameter, or FunctionDeclaration, and produces a JavaScript
// name by appending a unique indentifying suffix, such as "_1" or "_503".
// It uses a cache so it can return the same exact string each time it is
// called with a particular entity.
const jsName = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!(map.has(v))) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
  };
})();

// This is a nice helper for variable declarations and assignment statements.
// The AST represents both of these with lists of sources and lists of targets,
// but when writing out JavaScript it seems silly to write `[x] = [y]` when
// `x = y` suffices.
function bracketIfNecessary(a) {
  if (a.length === 1) {
    return `${a}`;
  }
  return `[${a.join(", ")}]`;
}

function generateLibraryFunctions() {
    function generateLibraryStub(name, params, body) {
        const entity = Context.INITIAL.localVariables[name];
        emit(`function ${jsName(entity)}(${params}) {${body}}`);
    }
    // This is sloppy. There should be a better way to do this.
    generateLibraryStub("print", "_", "console.log(_);");
}


Object.assign(Argument.prototype, {
    gen() {
        let translation = jsName(this);
        if (this.id) {
            translation += ` = ${this.id.gen()}`;
        }
        return translation;
    },
});

Object.assign(Arguments.prototype, {
    gen() { return this.args.forEach(arg => arg.gen()); },
});

Object.assign(Params.prototype, {
    gen() {
        this.params.forEach(param => param.gen());
    },
});

Object.assign(BinExp.prototype, {
    gen() { return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`; },
});

Object.assign(AddExp.prototype, {
    gen() { return `(${this.addexp.gen()} ${makeOp(this.op)} ${this.mullexp.gen()})`; },
});

Object.assign(MullExp.prototype, {
    gen() { return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`; },
});

Object.assign(PrefixExp.prototype, {
    gen() { return `(${makeOp(this.op)} ${this.right.gen()})`; },
});

Object.assign(ExpoExp.prototype, {
    gen() { return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`; },
});

Object.assign(ParenExp.prototype, {
    gen() { return `(${this.addexp.gen()})`; },
});


Object.assign(CharLit.prototype, {
    gen() { return `${this.value}`; },
});

Object.assign(FuncDec.prototype, {
    gen() {
        const parameters = [];
        this.params.forEach((param) => {
            parameters.push(param.gen());
        });
        emit(`let ${jsName(this)} = (${parameters}) => {`);
            indentLevel += 1;
            this.body.gen();
            indentLevel -= 1;
            emit("}");
        },
});

Object.assign(List.prototype, {
  gen() {
      const eles = [];
      this.elements.forEach((element) => {
          eles.push(element.gen());
      });
      emit(`[${eles}]`);
  },
});

Object.assign(FuncCall.prototype, {
    gen() {
        emit(`${this.id} ${this.args}`);
    },
});

Object.assign(StatementIfElse.prototype, {
  gen() {
      emit(`if ${this.ifExpression} {`);
      this.ifBlock.gen();
      for (let i = 0; i < this.elseIfExpressions.length; i += 1) {
          emit(`} else if ${this.elseIfExpressions[i]} {`);
          this.elseIfBlocks[i].gen();
      }
      emit("} else ");
      this.elseBlock.gen();
  },
});

Object.assign(NumLit.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(Param.prototype, {
  gen() {
      return `${(this)}`;
  },
});

Object.assign(Program.prototype, {
  gen() {
      generateLibraryFunctions();
      return `${this.block.gen()}`;
  },
});

Object.assign(Body.prototype, {
  gen() {
    return `${this.block.gen()}`;
  },
});

Object.assign(Block.prototype, {
    gen() {
        this.statements.forEach(statement => statement.gen());
    },
});
/*

*/
Object.assign(Return.prototype, {
  gen() {
    if (this.returnValue) {
      emit(`return ${this.parenexp.gen()};`);
    } else {
      emit("return;");
    }
  },
});

Object.assign(Print.prototype, {
  gen() {
    if (this.binexp) {
      emit(`console.log(${this.binexp.gen()});`);
    } else {
      emit("console.log();");
    }
  },
});

Object.assign(StringLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(Decl.prototype, {
  gen() {
    emit(`let ${jsName(this)} = ${this.exp.gen()};`);
  },
});

Object.assign(MatchExp.prototype, {
  gen() {
    const context = new Context();
    emit(`let ${this.id}Compare;`);
    this.matches.forEach((match) => {
      match.exp1.analyze(context);
      emit(`${this.id}Compare = ${match.exp1};`);
      if (match.exp1.isList) {
        emit(`for (let i = 0; i <= ${this.id}.length; i++) {
    if (${this.id}[i] === ${this.id}Compare[i]) {
      return ${match.exp2};
    }
  }`);
      } else {
        emit(`if (${this.id} === ${this.id}Compare) {
    return ${match.exp2};
  }`);
      }
    });
  },
});
