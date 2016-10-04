'use strict';

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

var _closeButton = require('./close-button');

var _closeButton2 = _interopRequireDefault(_closeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (state, header, body, dir) {
  var isLeft = dir === 'left';
  var style = {
    transition: dir + ' ' + state.transition + ', visibility ' + state.transition,
    visibility: state.displayPanel$() === dir ? 'visible' : 'hidden'
  };

  return (0, _h2.default)('div.ff-dashboard-' + dir + 'Panel', {
    style: style,
    hook: { insert: function insert(vnode) {
        setWidth(state, isLeft)(vnode.elm);
        setHeight(vnode.elm);
        window.addEventListener('resize', function (ev) {
          return setHeight(vnode.elm);
        });
        window.addEventListener('resize', function (ev) {
          return setWidth(state, isLeft)(vnode.elm);
        });
      },
      update: function update(vnode) {
        var elm = vnode.elm;
        elm.style[dir] = dir === state.displayPanel$() ? 0 : '-' + elm.offsetWidth + 'px';
        setHeight(elm);
      }
    }
  }, [(0, _h2.default)('div.ff-dashboard-panelHeader', [isLeft ? header : (0, _closeButton2.default)(state), !isLeft ? header : (0, _closeButton2.default)(state)]), (0, _h2.default)('div.ff-dashboard-panelBody', [body])]);
};

var setHeight = function setHeight(panel) {
  var header = panel.parentElement.querySelector('.ff-dashboard-panelHeader');
  panel.style.paddingTop = header.offsetHeight + 'px';
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