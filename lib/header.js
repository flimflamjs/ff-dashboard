'use strict';

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (content) {
  return (0, _h2.default)('div.ff-dashboard-header', [content]);
};