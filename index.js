import h from 'snabbdom/h'
import flyd from 'flyd'
import R from 'ramda'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'

import dashboard from '../scripts/index'
import main from './main'
import details from './details'
import data from './data'

const header = state => 
  h('div.table.fullWidth', [
    h('a.table-cell', {on: {click: x => state.showFilters$(true)}}, 'Filter')
  , h('h4.table-cell', 'Kraftwerk Discography')
  ])

const init = _ => {
  const state = {}
  state.showFilters$ = flyd.stream()
  state.dataId$ = flyd.stream()
  state.data$ = flyd.merge(
      flyd.stream({})
    , flyd.map(i => R.find(R.propEq('id', i), data), state.dataId$))

  const displayPanel$ = flyd.merge(
      flyd.map(R.always('left'), state.showFilters$)
    , flyd.map(x => x.name ? 'right' : undefined , state.data$)
  )

  state.dashboard = dashboard.init({displayPanel$})
  return state
}

const view = state => 
  h('div', [
    dashboard.view(state.dashboard, {
        header: header(state)
      , mainPanelBody: main(state)
      , rightPanelHeader: h('h3', state.data$().name)
      , rightPanelBody: details(state)
      , leftPanelHeader: h('h3', 'Filter')
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

