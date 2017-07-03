var BigNumber = require('bignumber.js');

exports._intToBigNumber = function(value) {
  return new BigNumber(value.toString(10), 10);
};

exports._eqBigNumber = function(n) {
    return function(m) { return m.equals(n); };
};

exports._addBigNumber = function(n) {
    return function (m) { return n.add(m); };
};

exports._mulBigNumber = function(n) {
    return function (m) { return n.times(m); };
};

exports._subBigNumber = function(n) {
    return function (m) { return n.minus(m); };
};

exports.compareTo = function (a) {
  return function (b) {
    return a.compareTo(b);
  };
};

exports.fromStringAsImpl = function (just) {
  return function (nothing) {
    return function (radix) {
      return function (s) {
        var result;
        try {
            if (radix === 16) {
              if (s.indexOf('0x') === 0 || s.indexOf('-0x') === 0) {
                result = new BigNumber(s.replace('0x',''), 16);
              } else {
                result = new BigNumber(s, radix);
              }
            } else {
              result = new BigNumber(s, radix);
            }
        } catch (e) {
          return nothing;
        }
        return just(result);
      };
    };
  };
};

exports.toString = function (radix) {
  return function (bn) { return bn.toString(radix); };
};

exports.reciprical = function (bn) {
  var one = new BigNumber(1, 10);
  return one.dividedBy(bn);
}
