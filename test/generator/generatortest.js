const assert = require("assert");
const parse = require("../../parser.js");
require("../../generator/generator");

describe("JCaml Generator", () => {
  it("One Liner: ", () => {
      const program = parse("spit(\"Hello, World\")");
      program.gen();
      const expected = "function print_1(_) {console.log(_);} console.log(\"Hello, World\")";
      assert.equal(console.string, expected);
  });
  it("function declaration", () => {
      const program = parse("let fun testFunction = (paramTest, paramTest1) => : spit(\"Hello, World\");;");
      program.gen();
      const expected = "function v_3 (v_2) {(((return (((v_2))));))};";
      assert.equal(console.string, expected);
  });
  it("match statment", () => {
      const program = parse("let fun matchList = (a, b, c) => string : match b with | [\"a\", \"b\", \"cat\"] -> \"Hello\" | [] -> \"empty\";;");
      program.gen();
      const expected = "function v_5 (v_4) {((if ((v_4).length === (([])).length && (v_4[0] === ([])[0] || typeof ([])[0] === \"undefined\")) { ((return (((5.0))));)} else { ((return (((6.0))));)}))};";
      assert.equal(console.string, expected);
  });
});
