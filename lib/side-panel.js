'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

var _closeButton = require('./close-button');

var _closeButton2 = _interopRequireDefault(_closeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (state, body, dir) {
  var isLeft = dir === 'left';
  var style = {
    transition: dir + ' ' + state.transition + ', visibility ' + state.transition,
    visibility: state.displayPanel$() === dir ? 'visible' : 'hidden'
  };

  var attrs = {};
  attrs['data-ff-dashboard-' + dir + '-panel'] = '';

  return (0, _h2.default)('div', {
    style: style,
    attrs: attrs,
    hook: {
      insert: function insert(vnode) {
        setWidth(state, isLeft)(vnode.elm);
        window.addEventListener('resize', function (ev) {
          return setWidth(state, isLeft)(vnode.elm);
        });
      },
      update: function update(vnode) {
        var elm = vnode.elm;
        elm.style[dir] = dir === state.displayPanel$() ? 0 : '-' + elm.offsetWidth + 'px';
      }
    }
  }, [(0, _h2.default)('div', { attrs: { 'data-ff-dashboard-panel-body': '' } }, _ramda2.default.concat([(0, _closeButton2.default)(state)], [body]))]);
};

var setWidth = function setWidth(state, isLeft) {
  return function (panel) {
    var parentWidth = panel.parentElement.offsetWidth;
    var width = isLeft ? state.leftPanelWidth : state.rightPanelWidth;
    var offset = isLeft ? state.leftPanelOffset : state.rightPanelOffset;
    var remainder = parentWidth - offset;
    panel.style.width = parentWidth >= width + offset ? width + 'px' : remainder + 'px';
  };
};