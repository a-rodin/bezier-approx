'use strict';

var bezier = require('../lib/bezier-approx');
var assert = require('assert');

describe('convert cubic Bezier curve to a number of quadratic ones', function () {
  it('straight line to the same straight line (error ~ 1e-8)', function () {
    var converted = bezier.cubicToQuad(0, 0, 10, 10, 20, 20, 30, 30, 1e-8);
    assert(converted.length === 6);
    assert(converted[0] === 0 && converted[1] === 0,
        converted[2] === 15 && converted[3] === 15 &&
        converted[4] === 30 && converted[5] === 30);
  });
  it('quadratic curve to the same quadratic curve (error ~ 1e-8)', function () {
    var converted = bezier.cubicToQuad(0, 0, 10, 10, 20, 10, 30, 0, 1e-8);
    assert(converted.length === 6);
    assert(converted[0] === 0 && converted[1] === 0 &&
        converted[2] === 15 && converted[3] === 15 &&
        converted[4] === 30 && converted[5] === 0);
  });
  it('cubic curve that is close to quadratic to a quadratic one (error ~ 0.1)', function () {
    var converted = bezier.cubicToQuad(0, 0, 10, 9, 20, 11, 30, 0, 0.1);
    assert(converted.length === 6);
  });
  it('cubic curve that is not close to quadratic (error ~ 0.1)', function () {
    var src = [ 0, 0, 10, 0, -20, -20, -10, -50 ];
    var converted = bezier.cubicToQuad(src[0], src[1], src[2], src[3],
        src[4], src[5], src[6], src[7], 0.1);
    assert(bezier.isApproximationClose(src[0], src[1], src[2], src[3],
        src[4], src[5], src[6], src[7], converted, 0.1));
  });
  it('cubic curve have to be converted to two or more quads for large errorBound (error ~ 100)', function () {
    var src = [ 0, 0, -5, 10, 35, 10, 30, 0 ];
    var converted = bezier.cubicToQuad(src[0], src[1], src[2], src[3],
      src[4], src[5], src[6], src[7], 100);
    assert(converted.length > 6);
  });
});
