const fs = require('fs');
const ohm = require('ohm-js');
const assert = require('assert');

const jcaml = fs.readFileSync('JCaml.ohm');
const gram = ohm.grammar(jcaml);


describe('Arithmetic', () => {
  describe('3 + 1', () => {
    it('should be equivalent to result', () => {
      let match = gram.match('1 + 3');
      assert.ok(match.succeeded());
    });
  });
  describe('4 > 2', () => {
    it('should be equivilent to result', () => {
      let match = gram.match('4 > 2');
      assert.ok(match.succeeded());
    });
  });
  describe('!a', () => {
    it('should not be equivelant to result' , () => {
      let a = 5;
      assert.ok('!a');
    });
  });
});
