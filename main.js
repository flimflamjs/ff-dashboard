import R from 'ramda'
import h from 'snabbdom/h'
import data from './data'

const row = state => d =>
  h('tr', [
    h('td', [h('a', {on: {click: x => state.dataId$(d.id)}}, d.name)])
  , h('td', d.description.substring(0, 70) + '...')
  ])

module.exports = state => 
  h('table', R.map(row(state), data))

