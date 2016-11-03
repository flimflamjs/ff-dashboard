import R from 'ramda'
import h from 'snabbdom/h'
import high from './highlight-match'

const person = state => p => 
  h('small.mr-1.mb-1.px-1.bg-white.inline-block', high(state.filterBy$().personnel, p.name), p.name)

const row = state => d =>
  h('tr', [
    h('td', [h('a', {on: {click: x => state.dataId$(d.id)}}, d.name)])
  , h('td', d.year) 
  , h('td', Number(d.length).toFixed(2).replace('.', ':'))
  , h('td.pt-1.pb-0.px-0', R.map(person(state), d.personnel))
  ])

module.exports = state => 
  h('table.width-full', R.concat(
    [
      h('tr.bold', [
        h('td', 'Name')
      , h('td', 'Year')
      , h('td', 'Length')
      , h('td', 'Personnel')
      ])
    ], R.map(row(state), state.dataMain$() || []))
  )

