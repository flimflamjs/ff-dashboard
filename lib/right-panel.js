'use strict';

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

var _sidePanel = require('./side-panel');

var _sidePanel2 = _interopRequireDefault(_sidePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (state, body) {
  return (0, _sidePanel2.default)(state, body, 'right');
};