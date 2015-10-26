'use strict';

var bezier = require('../lib/bezier-approx');
var assert = require('assert');

describe('pass to isInLine function', function () {
  it('straight line (error ~ 1e-8)', function () {
    assert(bezier.isInLine(0, 0, 10, 10, 20, 20, 1e-8));
  });
  it('quadratic curve with midpoint distance ~ 0.01 is not line (error ~ 1e-8)', function () {
    assert(!bezier.isInLine(0, 0, 10, 0.01, 20, 0, 1e-8));
  });
  it('quadratic curve with midpoint distance ~ 0.01 is line (error ~ 0.1)', function () {
    assert(bezier.isInLine(0, 0, 10, 0.01, 20, 0, 0.1));
  });
});
