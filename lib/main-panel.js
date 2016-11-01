'use strict';

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var left = function left(state) {
  return function (vnode) {
    var elm = vnode.elm;
    var left = state.displayPanel$() === 'left' ? elm.parentElement.querySelector('[data-ff-dashboard-left-panel]').offsetWidth + 'px' : 0;
    elm.style.left = left;
  };
};

module.exports = function (state, content) {
  return (0, _h2.default)('div', {
    attrs: { 'data-ff-dashboard-main-panel': '' },
    style: { transition: 'left ' + state.transition },
    hook: { update: function update(vnode) {
        left(state)(vnode);
        window.addEventListener('resize', function (ev) {
          return left(state)(vnode);
        });
      }
    }
  }, [(0, _h2.default)('div', { attrs: { 'data-ff-dashboard-panel-body': '' } }, [content])]);
};