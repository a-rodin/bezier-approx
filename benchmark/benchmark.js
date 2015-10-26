#!/usr/bin/env node
'use strict';

/* eslint-disable no-console */

var Benchmark = require('benchmark');
var bezier = require('../lib/bezier-approx');

var suite = new Benchmark.Suite('bezier-approx');

suite
.add('cubicToQuad (straight line given)', function () {
  bezier.cubicToQuad(0, 0, 10, 0, 20, 0, 30, 0, 1e-3);
})
.add('cubicToQuad (quadratic curve given)', function () {
  bezier.cubicToQuad(0, 0, 10, 10, 20, 10, 30, 0, 1e-3);
})
.add('cubicToQuad (cubic curve given, approx with 2 segments)', function () {
  bezier.cubicToQuad(0, 0, 10, 9, 20, 11, 30, 0, 0.01);
})
.add('cubicToQuad (cubic curve given, approx with 3 segments)', function () {
  bezier.cubicToQuad(0, 0, 10, 0, -20, -20, -10, 5, 1);
})
.add('cubicToQuad (cubic curve given, approx with 8 segments)', function () {
  bezier.cubicToQuad(0, 0, 10, 0, -20, -20, -10, 5, 0.01);
})
.on('cycle', function (event) {
  console.log(String(event.target));
})
.run();

