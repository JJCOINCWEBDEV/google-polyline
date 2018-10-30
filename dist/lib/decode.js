"use strict";

module.exports = decode;

function decode(value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$factor = _ref.factor,
      factor = _ref$factor === undefined ? 1e5 : _ref$factor,
      mapFn = _ref.mapFn,
      _ref$start = _ref.start,
      start = _ref$start === undefined ? 0 : _ref$start,
      _ref$end = _ref.end,
      end = _ref$end === undefined ? value.length : _ref$end;

  var points = [];
  var x = void 0,
      y = void 0,
      px = 0,
      py = 0;
  var point = void 0;

  integers(value, start, end, function (v) {
    if (y === undefined) {
      // y (as in longitude) comes first
      y = v;
      return;
    }
    x = v;

    x = x + px;
    y = y + py;

    point = [x / factor, y / factor];
    if (mapFn) {
      point = mapFn(point);
    }
    points.push(point);

    px = x;
    py = y;

    x = y = undefined;
  });

  return points;
}

function sign(value) {
  return value & 1 ? ~(value >>> 1) : value >>> 1;
}

function integers(value, start, end, fn) {

  var byte = 0;
  var current = 0;
  var bits = 0;

  for (var i = start; i < end; i++) {

    byte = value.charCodeAt(i) - 63;
    current = current | (byte & 0x1F) << bits;
    bits += 5;

    if (byte < 0x20) {
      if (byte === -1 && bits === 5) {
        // special case - single byte 0 encoded as -1
        current = 0;
      }
      fn(sign(current));
      current = 0;
      bits = 0;
    }
  }
}