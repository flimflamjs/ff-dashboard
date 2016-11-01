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
  var headerHeight = document.querySelector('[data-ff-dashboard-header]').offsetHeight;
  var bodyHeight = document.body.offsetHeight;
  panels.style.height = bodyHeight - headerHeight + 'px';
};

var resetRightPanelScroll = function resetRightPanelScroll(_) {
  var elm = document.querySelector('[data-ff-dashboard-right-panel] [data-ff-dashboard-panel-body]');
  if (!elm) return;
  elm.scrollTop = 0;
};

var view = function view(state, content) {
  return (0, _h2.default)('div', { attrs: { 'data-ff-dashboard': '' } }, [(0, _header2.default)(content.header), (0, _h2.default)('div', {
    attrs: { 'data-ff-dashboard-panels': '' },
    hook: {
      insert: function insert(vnode) {
        setHeight(vnode.elm);
        window.addEventListener('resize', function (ev) {
          return setHeight(vnode.elm);
        });
      },
      update: function update(vnode) {
        return setHeight(vnode.elm);
      }
    }
  }, [(0, _leftPanel2.default)(state, content.leftPanel || ''), (0, _mainPanel2.default)(state, content.mainPanel || ''), (0, _rightPanel2.default)(state, content.rightPanel || '')])]);
};

module.exports = { init: init, view: view };