import R from 'ramda'
import h from 'snabbdom/h'
import flyd from 'flyd'

module.exports = state => 
   h('div', [
    h('h1', state.data$().name)
  , h('img', {props: {src: state.data$().img}})
  , h('p', state.data$().description)
  ])

