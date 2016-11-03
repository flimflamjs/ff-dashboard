const assert = require('assert')
const R = require("ramda")
const flyd = require("flyd")
const mergeAll = require("flyd/module/mergeall")
const render = require('flimflam-render')
const h = require('snabbdom/h')
const snabbdom = require('snabbdom')

const dashboard = require('../lib')

const patch = snabbdom.init([ 
  require('snabbdom/modules/class') 
, require('snabbdom/modules/props')
, require('snabbdom/modules/attributes')
, require('snabbdom/modules/style')
, require('snabbdom/modules/eventlisteners')
])

const css = require('../index.css')

function init() {
  const state = {}

  state.dashboard = dashboard.init({
    leftPanelWidth: 400
  , leftPanelOffset: 200
  , rightPanelWidth: 700
  , rightPanelOffset: 50 
  , transition: '1s ease'
  })

  const view = state => 
    h('div', [
      dashboard.view(state.dashboard, {
          header: h('header', 'header content')
        , mainPanel: h('div', 'main content') 
        , rightPanel: h('div', 'right panel content')
        , leftPanel: h('div', 'left panel content')
      })
    ])


  const container = document.createElement('div')
  document.body.appendChild(container)
  const streams = render({state, view, patch, container})
  streams.state = state
  return streams
}

suite('ff-dashboard')

const q = s => document.querySelector(s)

const clear = () => {let ff = q('[data-ff-dashboard]'); ff ? ff.remove() : ''}

test("left panel visibility gets set correctly", () => {
  const streams = init()
  streams.state.dashboard.displayPanel$('left')
  assert.equal(q('[data-ff-dashboard-left-panel]').style.visibility, 'visible')
  streams.state.dashboard.displayPanel$('right')
  assert.equal(q('[data-ff-dashboard-left-panel]').style.visibility, 'hidden')
  streams.state.dashboard.displayPanel$('main')
  assert.equal(q('[data-ff-dashboard-left-panel]').style.visibility, 'hidden')
  clear()
})

test("left panel width gets set correctly", () => {
  const streams = init()
  assert.equal(q('[data-ff-dashboard-left-panel]').style.width, '400px')
  clear()
})

test("left panel left position gets set correctly", () => {
  const streams = init()
  streams.state.dashboard.displayPanel$('main')
  assert.equal(q('[data-ff-dashboard-left-panel]').style.left, '-400px')
  streams.state.dashboard.displayPanel$('left')
  assert.equal(q('[data-ff-dashboard-left-panel]').style.left, '0px')
  streams.state.dashboard.displayPanel$('right')
  assert.equal(q('[data-ff-dashboard-left-panel]').style.left, '-400px')
  clear()
})

test("right panel visiblily gets set correctly", () => {
  const streams = init()
  streams.state.dashboard.displayPanel$('right')
  const rightPanel = q('[data-ff-dashboard-right-panel]')
  assert.equal(rightPanel.style.visibility, 'visible')
  clear()
})

test("right panel width gets set correctly", () => {
  const streams = init()
  assert.equal(q('[data-ff-dashboard-right-panel]').style.width, '700px')
  clear()
})

test("right panel right position gets set correctly", () => {
  const streams = init()
  streams.state.dashboard.displayPanel$('main')
  assert.equal(q('[data-ff-dashboard-right-panel]').style.right, '-700px')
  streams.state.dashboard.displayPanel$('left')
  assert.equal(q('[data-ff-dashboard-right-panel]').style.right, '-700px')
  streams.state.dashboard.displayPanel$('right')
  assert.equal(q('[data-ff-dashboard-right-panel]').style.right, '0px')
  clear()
})

test("transitions get set correctly", () => {
  const streams = init()
  const rightPanel = q('[data-ff-dashboard-right-panel]')
  const leftPanel = q('[data-ff-dashboard-left-panel]')
  const mainPanel = q('[data-ff-dashboard-main-panel]')
  assert.equal(rightPanel.style.transition, 'right 1s ease, visibility 1s ease')
  assert.equal(leftPanel.style.transition, 'left 1s ease, visibility 1s ease')
  assert.equal(mainPanel.style.transition, 'left 1s ease')
  clear()
})

test("main panel left position gets set correctly", () => {
  const streams = init()
  streams.state.dashboard.displayPanel$('main')
  assert.equal(q('[data-ff-dashboard-main-panel]').style.left, '0px')
  streams.state.dashboard.displayPanel$('left')
  assert.equal(q('[data-ff-dashboard-main-panel]').style.left, '400px')
  streams.state.dashboard.displayPanel$('right')
  assert.equal(q('[data-ff-dashboard-main-panel]').style.left, '0px')
  clear()
})

