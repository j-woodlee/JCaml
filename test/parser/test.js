const fs = require("fs");
const assert = require("assert");
const parse = require("../../parser.js");

describe("The parser", () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith(".jml")) {
      it(`produces the correct AST for ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, "utf-8", (err, input) => {
          const ast = parse(input);
          console.log(ast)
          fs.readFile(`${__dirname}/${name}.json`, "utf-8", (_err, expected) => {
            assert.equal(JSON.stringify(ast), expected.trim());
            done();
          });
        });
      });
    }
  });
});
