import h from 'snabbdom/h'
import flyd from 'flyd'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'

import dashboard from '../scripts/index'

const headerContent = state =>
  h('a', {on: {click: x => state.clickPanel$('left')}}, 'open left panel')

const mainPanelContent = state =>
  h('a', {on: {click: x => state.clickPanel$('right')}}, 'open right panel')

const init = _ => {
  const state = {}
  state.clickPanel$ = flyd.stream('main')

  state.dashboard = dashboard.init({
    displayPanel$: flyd.map(x => x, state.clickPanel$) 
  , headerContent: headerContent(state)
  , mainPanelContent: mainPanelContent(state)
  })
  return state
}

const view = state => dashboard.view(state.dashboard)

const patch = snabbdom.init([
  require('snabbdom/modules/class')
, require('snabbdom/modules/props')
, require('snabbdom/modules/style')
, require('snabbdom/modules/eventlisteners')
, require('snabbdom/modules/attributes')
])

let container = document.querySelector('#container')

render({patch, container, view, state: init()})

