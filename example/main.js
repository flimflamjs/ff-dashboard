import R from 'ramda'
import h from 'snabbdom/h'
import high from './highlight-match'

const person = state => p => 
  h('small.mr2', high(state.filterBy$().personnel, p.name), p.name)

const row = state => d =>
  h('tr', [
    h('td', [h('a', {on: {click: x => state.dataId$(d.id)}}, d.name)])
  , h('td', d.year) 
  , h('td', Number(d.length).toFixed(2).replace('.', ':'))
  , h('td', R.map(person(state), d.personnel))
  ])

module.exports = state => 
  h('table.fullWidth', R.concat(
    [
      h('tr.bold', [
        h('td', 'Name')
      , h('td', 'Year')
      , h('td', 'Length')
      , h('td', 'Musicians')
      ])
    ], R.map(row(state), state.dataMain$() || []))
  )

