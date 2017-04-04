const fs = require("fs");
const ohm = require("ohm-js");
const assert = require("assert");

const jcaml = fs.readFileSync("JCaml.ohm");
const gram = ohm.grammar(jcaml);


describe("Arithmetic", () => {
  describe("3 + 1", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("1 + 3");
      assert.ok(match.succeeded());
    });
  });
  describe("4 > 2", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("4 > 2");
      assert.ok(match.succeeded());
    });
  });
  describe("!5", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("!5");
      assert.ok(match.succeeded());
    });
  });
  describe("44^3", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("44^3");
      assert.ok(match.succeeded());
    });
  });
  describe("44^3", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("44^3");
      assert.ok(match.succeeded());
    });
  });
  describe("44^g", () => {
    it("should not be equivalent to result", () => {
      const match = gram.match("44^3g");
      assert.ok(!match.succeeded());
    });
  });
  describe("44^g", () => {
    it("should not be equivalent to result", () => {
      const match = gram.match("44^3g");
      assert.ok(!match.succeeded());
    });
  });
  describe("5 = 5", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("5 == 5");
      assert.ok(match.succeeded());
    });
  });
  describe("5 ? 6 + 7 : 56", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("5 ? 6 + 7 : 56");
      assert.ok(match.succeeded());
    });
  });
  describe("let a = 67 * 2", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("let a = 67 * 2");
      assert.ok(match.succeeded());
    });
  });
  describe("4 and 5", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("4 and 5");
      assert.ok(match.succeeded());
    });
  });
  describe("tuple", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("(4, 5)");
      assert.ok(match.succeeded());
    });
  });
  describe("list", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("[4, 5, 57, 69]");
      assert.ok(match.succeeded());
    });
  });
  describe("list", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("[(4, 5), (57, 78), (420, 69)]");
      assert.ok(match.succeeded());
    });
  });
  describe("list", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("[(4, 5), (57, 78), 420]");
      assert.ok(match.succeeded());
    });
  });
  describe("list", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("[(4, 5), (57, 78), \"hello\"]");
      assert.ok(match.succeeded());
    });
  });
  describe("print", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("spit(\"hello, World\")");
      assert.ok(match.succeeded());
    });
  });
  describe("list", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("[(\"string\", 67)]");
      assert.ok(match.succeeded());
    });
  });
  describe("list", () => {
    it("should be equivalent to result", () => {
      const match = gram.match("[\"string\", 67]");
      assert.ok(match.succeeded());
    });
  });
});
