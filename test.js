var assert = require('assert')
var R = require("ramda")
var flyd = require("flyd")
var render = require('flimflam-render')
var h = require('snabbdom/h')
var snabbdom = require('snabbdom')

var dashboard = require('./lib')

var patch = snabbdom.init([ 
  require('snabbdom/modules/class') 
, require('snabbdom/modules/props')
, require('snabbdom/modules/style')
, require('snabbdom/modules/eventlisteners')
])

var css = require('./index.css')

function init(state) {
  state = R.merge({
    openLeftPanel$: flyd.stream()
  , openRightPanel$: flyd.stream()
  }, state || {})

  const displayPanel$ = flyd.merge(
      flyd.map(() => 'left', state.openLeftPanel$)
    , flyd.map(() => 'right', state.openRightPanel$))

  state.dashboard = dashboard.init({
    displayPanel$
  , leftPanelWidth: 400
  , leftPanelOffset: 200
  , rightPanelWidth: 700
  , rightPanelOffset: 50 
  , transition: '1s ease'
  })

  const view = state => 
    h('div', [
      dashboard.view(state.dashboard, {
          header: h('header', [
            h('button', {on: {click: state.openRightPanel$}}, 'Open Right Panel')
          , h('button', {on: {click: state.openLeftPanel$}}, 'Open Left Panel')
          ])
        , mainPanelBody: h('div', 'Main content') 
        , rightPanelHeader: h('h3', 'Right panel header')
        , rightPanelBody: h('div', 'Right panel content')
        , leftPanelHeader: h('h3', 'Left panel header')
        , leftPanelBody: h('div', 'Left panel content')
      })
    ])

  let container = document.createElement('div')
  document.body.appendChild(container)
  let streams = render({state, view, patch, container})
  streams.state = state
  return streams
}

suite('ff-dashboard')

const q = s => document.querySelector(s)

const clear = () => {let ff = q('.ff-dashboard'); ff ? ff.remove() : ''}

test("left panel visibility gets set correctly", () => {
  clear()
  let streams = init()
  streams.state.dashboard.displayPanel$('left')
  assert.equal(q('.ff-dashboard-leftPanel').style.visibility, 'visible')
  streams.state.dashboard.displayPanel$('right')
  assert.equal(q('.ff-dashboard-leftPanel').style.visibility, 'hidden')
  streams.state.dashboard.displayPanel$('main')
  assert.equal(q('.ff-dashboard-leftPanel').style.visibility, 'hidden')
  clear()
})

test("left panel width gets set correctly", () => {
  let streams = init()
  assert.equal(q('.ff-dashboard-leftPanel').style.width, '400px')
  clear()
})

test("left panel left position gets set correctly", () => {
  let streams = init()
  streams.state.dashboard.displayPanel$('main')
  assert.equal(q('.ff-dashboard-leftPanel').style.left, '-400px')
  streams.state.dashboard.displayPanel$('left')
  assert.equal(q('.ff-dashboard-leftPanel').style.left, '0px')
  streams.state.dashboard.displayPanel$('right')
  assert.equal(q('.ff-dashboard-leftPanel').style.left, '-400px')
  clear()
})

test("panel body top padding gets set correctly", () => {
  let streams = init()
  let leftPanel = q('.ff-dashboard-leftPanel')
  let header = q('.ff-dashboard-leftPanel .ff-dashboard-panelHeader')
  assert.equal(leftPanel.style.paddingTop, header.offsetHeight + 'px')
  clear()
})

test("right panel visiblily gets set correctly", () => {
  let streams = init()
  streams.state.dashboard.displayPanel$('right')
  let rightPanel = q('.ff-dashboard-rightPanel')
  assert.equal(rightPanel.style.visibility, 'visible')
  clear()
})

test("right panel width gets set correctly", () => {
  let streams = init()
  assert.equal(q('.ff-dashboard-rightPanel').style.width, '700px')
  clear()
})

test("right panel right position gets set correctly", () => {
  let streams = init()
  streams.state.dashboard.displayPanel$('main')
  assert.equal(q('.ff-dashboard-rightPanel').style.right, '-700px')
  streams.state.dashboard.displayPanel$('left')
  assert.equal(q('.ff-dashboard-rightPanel').style.right, '-700px')
  streams.state.dashboard.displayPanel$('right')
  assert.equal(q('.ff-dashboard-rightPanel').style.right, '0px')
  clear()
})

test("transitions get set correctly", () => {
  let streams = init()
  let rightPanel = q('.ff-dashboard-rightPanel')
  let leftPanel = q('.ff-dashboard-leftPanel')
  let mainPanel = q('.ff-dashboard-mainPanel')
  assert.equal(rightPanel.style.transition, 'right 1s ease, visibility 1s ease')
  assert.equal(leftPanel.style.transition, 'left 1s ease, visibility 1s ease')
  assert.equal(mainPanel.style.transition, 'left 1s ease')
  clear()
})

test("main panel left position gets set correctly", () => {
  let streams = init()
  streams.state.dashboard.displayPanel$('main')
  assert.equal(q('.ff-dashboard-mainPanel').style.left, '0px')
  streams.state.dashboard.displayPanel$('left')
  assert.equal(q('.ff-dashboard-mainPanel').style.left, '400px')
  streams.state.dashboard.displayPanel$('right')
  assert.equal(q('.ff-dashboard-mainPanel').style.left, '0px')
  clear()
})

