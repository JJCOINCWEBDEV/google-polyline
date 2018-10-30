'use strict';

module.exports = encode;

function encode(points) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$factor = _ref.factor,
      factor = _ref$factor === undefined ? 1e5 : _ref$factor,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === undefined ? '' : _ref$prefix,
      mapFn = _ref.mapFn;

  var px = 0,
      py = 0;
  var str = prefix;

  for (var i = 0; i < points.length; ++i) {
    var point = points[i];
    if (mapFn) {
      point = mapFn(point, i, points);
    }

    var x = round(factor * point[0]);
    var y = round(factor * point[1]);

    // note the reverse order
    str = chars(str, sign(y - py));
    str = chars(str, sign(x - px));

    px = x;
    py = y;
  }

  return str;
}

function round(v) {
  return v < 0 ? -Math.floor(0.5 - v) : Math.round(v);
}

function sign(v) {
  return v < 0 ? ~(v << 1) : v << 1;
}

function chars(str, value) {
  while (value >= 0x20) {
    str += String.fromCharCode((value & 0x1F | 0x20) + 63);
    value = value >> 5;
  }
  return str + String.fromCharCode(value + 63);
}