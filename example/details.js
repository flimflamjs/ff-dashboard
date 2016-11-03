import R from 'ramda'
import h from 'snabbdom/h'
import flyd from 'flyd'
import high from './highlight-match'
import close from './close-button'

const personnel = state => p => 
  h('tr', 
    [ h('td.bold', high(state.filterBy$().personnel, p.name),  p.name)
    , h('td', `${R.map(x => x, p.instruments).join(', ')}`)
    ]
  )

module.exports = state => 
  h('div', [
    h('div.table.px-2.py-1', [
      h('span.table-cell.align-middle', [close(state)])
    , h('p.bold.pl-2.table-cell.align-middle.m-0.line-height-1', state.dataDetails$().name)
    ])
  , h('hr.m-0')
  , h('div.p-2', [
      h('div.table', [
        h('img.table-cell.align-middle', {props: {src: state.dataDetails$().img}})
      , h('table.table-cell.align-middle.pl-1', [
          h('tr', [ h('td.bold', 'Year') , h('td', state.dataDetails$().year) ])
        , h('tr', [ h('td.bold', 'Length')
          , h('td', Number(state.dataDetails$().length).toFixed(2).replace('.', ':')) ])
        , h('tr', [ 
            h('td.bold', 'Label')
          , h('td', R.map(x => x, state.dataDetails$().label || []).join(', '))
          ])
        ])
      ])
    , h('p.mt-2', state.dataDetails$().blurb)
    , h('p.bold.mb-1', 'Tracks')
    , h('ol', R.map(x => h('li', x), state.dataDetails$().tracks || []))
    , h('p.bold.mb-1', 'Personnel')
    , h('table', R.map(personnel(state), state.dataDetails$().personnel || []))
    ])
  ])

