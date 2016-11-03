import h from 'snabbdom/h'
import R from 'ramda'

module.exports = state => h('div.p-1', [
    h('div.table', [
      h('button.table-cell.align-middle.bold', {on: {click: _ => state.showFilters$(true)}}, 'Filter')
    , h('p.bold.line-height-1.table-cell.align-middle.pl-2.m-0', 'Kraftwerk Albums')
    ])
  , !R.keys(state.filterBy$()).length 
    ? ''
    : h('small.mt-1.inline-block', R.concat(
        ['Filtering by:']
      , R.concat(
          R.map(x => h('span.ml-1.highlight.px-1', x), R.keys(state.filterBy$()))
        , [h('a.ml-1', {on: {click: _ => state.filterBy$({})}}, 'Clear filters')]
        )
      ))
  ])

