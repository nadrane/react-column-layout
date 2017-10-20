"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = range;
function range(start, stop) {
  var next = start;
  var arr = [];
  while (next <= stop) {
    arr.push(next);
    next++;
  }
  return arr;
}