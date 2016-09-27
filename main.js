import R from 'ramda'
import h from 'snabbdom/h'

const row = state => d =>
  h('tr', [
    h('td', [h('a', {on: {click: x => state.dataId$(d.id)}}, d.name)])
  , h('td', d.year) 
  , h('td', Number(d.length).toFixed(2).replace('.', ':'))
  , h('td.small', R.map(x => x.name, d.personnel).join(', '))
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

