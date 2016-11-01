import h from 'snabbdom/h'

module.exports = state =>
  h('span.ff-dashboard-closeButton', {
    on: {click: _ => state.displayPanel$('main')}
  , props: {innerHTML : '&times'}
  })

