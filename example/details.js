import R from 'ramda'
import h from 'snabbdom/h'
import flyd from 'flyd'

const personnel = d => 
  h('tr', 
    [ h('td.bold', d.name)
    , h('td', `${R.map(x => x, d.instruments).join(', ')}`)
    ]
  )

module.exports = state => 
   h('div.pb2', [
    h('div.table', [
      h('img.table-cell.align-middle', {props: {src: state.data$().img}})
    , h('table.small.table-cell.align-middle.pl1', [
        h('tr', [ h('td.bold', 'Year') , h('td', state.data$().year) ])
      , h('tr', [ h('td.bold', 'Length')
        , h('td', Number(state.data$().length).toFixed(2).replace('.', ':')) ])
      , h('tr', [ 
          h('td.bold', 'Label')
        , h('td', R.map(x => x, state.data$().label || []).join(', '))
        ])
      ])
    ])
  , h('p.mt2', state.data$().blurb)
  , h('h4.mb1', 'Tracks')
  , h('ol.small', R.map(x => h('li', x), state.data$().tracks || []))
  , h('h4.mb1', 'Musicians')
  , h('table.small', R.map(personnel, state.data$().personnel || []))
  ])

