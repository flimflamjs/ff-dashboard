import h from 'snabbdom/h'

module.exports = state => 
  h('div.table.fullWidth', [
    h('a.table-cell.align-middle.bold', {on: {click: x => state.showFilters$(true)}}, 'Filter')
  , h('h4.table-cell.align-middle', 'Kraftwerk Discography')
  ])

