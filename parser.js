const fs = require("fs");

const ohm = require("ohm-js");

const parserContents = fs.readFileSync("JCaml.ohm");

const JCamlGrammar = ohm.grammar(parserContents);
const Type = require("./ast/type");

const Program = require("./ast/program");
const Block = require("./ast/block");
const StatementIfElse = require("./ast/statementIfElse");
const Decl = require("./ast/decl");
const Print = require("./ast/print");
const Return = require("./ast/return");
const Addop = require("./ast/addop");
const Relop = require("./ast/relop");
const Mullop = require("./ast/mullop");
const Expop = require("./ast/expop");
const Binop = require("./ast/binop");
const FuncDec = require("./ast/FuncDec");
const FuncCall = require("./ast/funcCall");
const Args = require("./ast/args");
const Arg = require("./ast/arg");
const Params = require("./ast/params");
const Param = require("./ast/param");
const Body = require("./ast/body");
const ExpBinary = require("./ast/exp_binary");
const ExpTernary = require("./ast/exp_ternary");
const BinExp = require("./ast/binExp");
const MatchExp = require("./ast/matchExp");
const AddExp = require("./ast/addExp");
const MullExp = require("./ast/mullExp");
const ParenExp = require("./ast/parenExp");
const Matches = require("./ast/matches");
const Tuplit = require("./ast/tuplit");
const Numlit = require("./ast/numLit");
const Charlit = require("./ast/charLit");
const Stringlit = require("./ast/stringLit");
const ExpoExp = require("./ast/expoExp");
const PrefixExp = require("./ast/prefix_Exp");
const List = require("./ast/list");
const Stmt = require("./ast/stmt");


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

module.exports = { parse, Program, Block, Stmt, Return, Arg, Param, Stringlit, FuncCall, FuncDec };
