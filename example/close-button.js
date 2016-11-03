import h from 'snabbdom/h'

module.exports = state =>
  h('a.m-0.line-height-1.h3', {
    on: {click: state.showMain$}
  , props: {innerHTML : '&times'}
  })

