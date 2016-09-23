import h from 'snabbdom/h'
import flyd from 'flyd'
import R from 'ramda'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'

import dashboard from '../scripts/index'
import main from './main'
import data from './data'

const headerContent = state =>
  h('a', {on: {click: x => state.showFilters$(true)}}, 'open left panel')

const init = _ => {
  const state = {}
  state.showFilters$ = flyd.stream()
  state.dataId$ = flyd.stream()
  state.data$ = flyd.map(i => R.find(R.propEq('id', i), data), state.dataId$) 

  const displayPanel$ = flyd.merge(
      flyd.map(R.always('left'), state.showFilters$)
    , flyd.map(R.always('right'), state.data$)
  )

  state.dashboard = dashboard.init({
    displayPanel$
  , headerContent: headerContent(state)
  , mainPanelContent: main(state)
  })
  flyd.map(x => console.log(x), state.data$)
  flyd.map(x => console.log(x), displayPanel$)
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

