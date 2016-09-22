// npm
import h from 'snabbdom/h'
import flyd from 'flyd'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'

const flatMap = R.curry(require('flyd/module/flatmap'))

const init = _ => {
  const state = {}
  return state
}

const view = state => 
  h('div', 'asdf') 

let container = document.querySelector('#container')

const patch = snabbdom.init([
  require('snabbdom/modules/class')
, require('snabbdom/modules/props')
, require('snabbdom/modules/style')
, require('snabbdom/modules/eventlisteners')
, require('snabbdom/modules/attributes')
])

render({patch, container, view, state: init()})

