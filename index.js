import h from 'snabbdom/h'
import flyd from 'flyd'
import flydFilter from 'flyd/module/filter'
import mergeAll from 'flyd/module/mergeall'
import R from 'ramda'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'
import cereal from 'form-serialize'

import dashboard from '../lib/index'
import main from './main'
import details from './details'
import data from './data'
import header from './header'
import filter from './filter'

const init = _ => {
  const state = {}
  state.showFilters$ = flyd.stream()
  state.dataId$ = flyd.stream()
  state.showMain$ = flyd.stream()
  state.dataDetails$ = flyd.merge(
      flyd.stream({})
    , flyd.map(i => R.find(R.propEq('id', i), data), state.dataId$))

  state.filterInput$ = flyd.stream()

  state.filterBy$ = flyd.merge(flyd.stream({}), flyd.map(inputToFilter, state.filterInput$))

  state.dataMain$ = flyd.map(filterData, state.filterBy$)

  const displayPanel$ = mergeAll([
      flyd.map(R.always('left'), state.showFilters$)
    , flyd.map(R.always('main'), state.showMain$)
    , flyd.map(x => x.name ? 'right' : undefined , state.dataDetails$)
  ])

  state.dashboard = dashboard.init({displayPanel$})
  return state
}

const inputToFilter = x => cereal(x.target.parentElement, {hash: true})

const filterByPersonnel = searchNames => 
   R.filter(d => { 
     let names = R.pluck('name', d.personnel)
      if (R.intersection(searchNames, names).length) return d
    }
  , data)

const filterData = filterBy => {
  if(!R.keys(filterBy).length) return data 
  let filteredData = []
  if(filterBy.personnel) {
    filteredData = R.concat(filteredData, filterByPersonnel(filterBy.personnel))
  }
  return filteredData
}

const view = state => 
  h('div', [
    dashboard.view(state.dashboard, {
        header: header(state)
      , mainPanel: main(state)
      , rightPanel: details(state)
      , leftPanel: filter(state)
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

