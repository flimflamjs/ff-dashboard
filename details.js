import R from 'ramda'
import h from 'snabbdom/h'
import flyd from 'flyd'

const personnel = d => 
  h('tr', 
    [ h('td', d.name)
    , h('td', `${R.map(x => x, d.instruments).join(', ')}`)
    ]
  )

module.exports = state => 
   h('div', [
    h('div.clearfix', [
      h('img.left.pr2', {props: {src: state.data$().img}})
    , h('table.small', [
        h('tr', [ h('td.bold', 'Name') , h('td', state.data$().name) ])
      , h('tr', [ h('td.bold', 'Year') , h('td', state.data$().year) ])
      , h('tr', [ h('td.bold', 'Length')
        , h('td', Number(state.data$().length).toFixed(2).replace('.', ':')) ])
      , h('tr', [ h('td.bold', 'Label')
        , h('td', R.map(x => x, state.data$().label || []).join(', '))
        ])
      ])
    ])
  , h('p.mt2', state.data$().blurb)
  , h('table.mt2.small', R.map(personnel, state.data$().personnel || []))
  ])

