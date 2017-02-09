const fs = require('fs');
const ohm = require('ohm-js');
const assert = require('assert');

const jcaml = fs.readFileSync('JCaml.ohm');
const gram = ohm.grammar(jcaml);


describe('Arithmetic', () => {
  describe('3 + 2', () => {
    it('should be equivilent to result', () => {
      let match = gram.match('2 + 3');
      assert.ok(match.succeeded());
    });
  });
});
