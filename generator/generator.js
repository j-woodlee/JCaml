
// const Context = require('../context');
const Program = require('../parser');
// const AddExp = require('../ast/addExp');
// const Args = require('../ast/args');
// const BinExp = require('../ast/binExp');
// const Block = require('../ast/block');
// const Body = require('../ast/body');
// const CharLit = require('../ast/charLit');
// const Declaration = require('../ast/decl');

const indentPadding = 2;
let indentLevel = 0;

Object.assign(Program.Program.prototype, {
    gen() {
        console.log("Generating");
    }
});
console.log('REQUIRING')
