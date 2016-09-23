import h from 'snabbdom/h'
import flyd from 'flyd'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'

import dashboard from '../scripts/index'

    // displayPanel$: flyd.stream('main')
  // , headerContent: '' 
  // , mainPanelContent: '' 
  // , leftPanelContent: '' 
  // , rightPanelContent: '' 
  // , leftPanelWidth: 20 
  // , rightPanelWidth: 60 
  // , transition: '0.2s ease-out'
  // }, state)

const headerContent = state =>
  h('div', [
    h('a', {on: {click: x => state.clickPanel$('left')}}, 'left')
  ])


const init = _ => {
  const state = {}
  state.clickPanel$ = flyd.stream('right')

  state.dashboard = dashboard.init({
    displayPanel$: flyd.map(x => x, state.clickPanel$) 
  , headerContent: headerContent(state)
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
