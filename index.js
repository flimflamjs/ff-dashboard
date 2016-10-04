'use strict';

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (state) {
  return (0, _h2.default)('div.ff-dashboard-closeButton', {
    on: { click: function click(_) {
        return state.displayPanel$('main');
      } },
    props: { innerHTML: '&times' }
  });
};
'use strict';

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (content) {
  return (0, _h2.default)('div.ff-dashboard-header', [content]);
};
'use strict';

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

var _flyd = require('flyd');

var _flyd2 = _interopRequireDefault(_flyd);

var _filter = require('flyd/module/filter');

var _filter2 = _interopRequireDefault(_filter);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _mainPanel = require('./main-panel');

var _mainPanel2 = _interopRequireDefault(_mainPanel);

var _leftPanel = require('./left-panel');

var _leftPanel2 = _interopRequireDefault(_leftPanel);

var _rightPanel = require('./right-panel');

var _rightPanel2 = _interopRequireDefault(_rightPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// local
// npm
var init = function init(state) {
  state = _ramda2.default.merge({
    displayPanel$: _flyd2.default.stream('main'),
    leftPanelWidth: 300,
    leftPanelOffset: 80,
    rightPanelWidth: 600,
    rightPanelOffset: 0,
    transition: '0.2s ease-out'
  }, state);

  var isShowingRightPanel$ = (0, _filter2.default)(function (x) {
    return x === 'right';
  }, state.displayPanel$);

  _flyd2.default.map(resetRightPanelScroll, isShowingRightPanel$);

  return state;
};

var setHeight = function setHeight(panels) {
  panels.style.height = 0;
  var headerHeight = document.querySelector('.ff-dashboard-header').offsetHeight;
  var bodyHeight = document.body.offsetHeight;
  panels.style.height = bodyHeight - headerHeight + 'px';
};

var resetRightPanelScroll = function resetRightPanelScroll(_) {
  var elm = document.querySelector('.ff-dashboard-rightPanel .ff-dashboard-panelBody');
  elm.scrollTop = 0;
};

var view = function view(state, content) {
  return (0, _h2.default)('div.ff-dashboard', { attrs: { 'data-display-panel': state.displayPanel$() } }, [(0, _header2.default)(content.header), (0, _h2.default)('div.ff-dashboard-panels', { hook: { insert: function insert(vnode) {
        setHeight(vnode.elm);
        window.addEventListener('resize', function (ev) {
          return setHeight(vnode.elm);
        });
      }
    }
  }, [(0, _leftPanel2.default)(state, content.leftPanelHeader || '', content.leftPanelBody || ''), (0, _mainPanel2.default)(state, content.mainPanelBody || ''), (0, _rightPanel2.default)(state, content.rightPanelHeader || '', content.rightPanelBody || '')])]);
};

module.exports = { init: init, view: view };
'use strict';

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

var _sidePanel = require('./side-panel');

var _sidePanel2 = _interopRequireDefault(_sidePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (state, header, body) {
  return (0, _sidePanel2.default)(state, header, body, 'left');
};
'use strict';

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var left = function left(state) {
  return function (vnode) {
    var elm = vnode.elm;
    var left = state.displayPanel$() === 'left' ? elm.parentElement.querySelector('.ff-dashboard-leftPanel').offsetWidth + 'px' : 0;
    elm.style.left = left;
  };
};

module.exports = function (state, content) {
  return (0, _h2.default)('div.ff-dashboard-mainPanel', {
    style: { transition: 'left ' + state.transition },
    hook: { update: function update(vnode) {
        left(state)(vnode);
        window.addEventListener('resize', function (ev) {
          return left(state)(vnode);
        });
      }
    }
  }, [(0, _h2.default)('div.ff-dashboard-panelBody', [content])]);
};
'use strict';

var _h = require('snabbdom/h');

var _h2 = _interopRequireDefault(_h);

var _sidePanel = require('./side-panel');

var _sidePanel2 = _interopRequireDefault(_sidePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (state, header, body) {
  return (0, _sidePanel2.default)(state, header, body, 'right');
};
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
