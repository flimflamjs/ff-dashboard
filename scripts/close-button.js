import h from 'snabbdom/h'

module.exports = state =>
  h('div.ff-dashboard-closeButton', {
    on: {click: _ => state.displayPanel$('main')}
  , props: {innerHTML : '&times'}
  })

