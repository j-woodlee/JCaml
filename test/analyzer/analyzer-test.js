const fs = require("fs");
const assert = require("assert");
const parse = require("../../parser.js").parse;

describe("The semantic analyzer", () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith(".error")) {
      it(`detects a ${name.replace(/[^a-z]/g, " ")}`, (done) => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
        const errorPattern = RegExp(name.replace(".error", "").replace(/-/g, " "), "i");
        assert.throws(() => program.analyze(), errorPattern);
        done();
      });
    } else if (name.endsWith(".jml")) {
      it(`should analyze ${name} without errors`, (done) => {
        // For now, we are happy to know that these files pass semantic analysis.
        // We eventually need to check that the ASTs are properly decorated.
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
        program.analyze();
        done();
      });
    }
  });
});
