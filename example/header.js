import h from 'snabbdom/h'
import R from 'ramda'

module.exports = state => h('div', [
    h('div.table.fullWidth', [
      h('a.table-cell.align-middle.bold', {on: {click: x => state.showFilters$(true)}}, 'Filter')
    , h('h4.table-cell.align-middle', 'Kraftwerk Discography')
    ])
  , !R.toPairs(state.filterBy$()).length 
    ? ''
    : h('span', 'Filtering by')

  ])

