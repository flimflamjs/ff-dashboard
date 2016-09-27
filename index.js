import h from 'snabbdom/h'
import flyd from 'flyd'
import R from 'ramda'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'

import dashboard from '../scripts/index'
import main from './main'
import details from './details'
import data from './data'
import header from './header'
import filter from './filter'


const init = _ => {
  const state = {}
  state.showFilters$ = flyd.stream()
  state.dataId$ = flyd.stream()
  state.dataDetails$ = flyd.merge(
      flyd.stream({})
    , flyd.map(i => R.find(R.propEq('id', i), data), state.dataId$))

  state.dataMain$ = flyd.stream(data)

  const displayPanel$ = flyd.merge(
      flyd.map(R.always('left'), state.showFilters$)
    , flyd.map(x => x.name ? 'right' : undefined , state.dataDetails$)
  )

  state.dashboard = dashboard.init({displayPanel$})
  return state
}

const view = state => 
  h('div', [
    dashboard.view(state.dashboard, {
        header: header(state)
      , mainPanelBody: main(state)
      , rightPanelHeader: h('h3', state.dataDetails$().name)
      , rightPanelBody: details(state)
      , leftPanelHeader: h('h3', 'Filter')
      , leftPanelBody: filter(state)
    })
  ])

const patch = snabbdom.init([
  require('snabbdom/modules/class')
, require('snabbdom/modules/props')
, require('snabbdom/modules/style')
, require('snabbdom/modules/eventlisteners')
, require('snabbdom/modules/attributes')
])

let container = document.querySelector('#container')

render({patch, container, view, state: init()})

