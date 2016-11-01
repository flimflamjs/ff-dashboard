import h from 'snabbdom/h'

module.exports = state =>
  h('span', {
    attrs: { 'data-ff-dashboard-close-button' : ''}
  , on: {click: _ => state.displayPanel$('main')}
  , props: {innerHTML : '&times'}
  })

