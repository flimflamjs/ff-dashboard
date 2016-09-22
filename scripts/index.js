// npm
import h from 'snabbdom/h'
import flyd from 'flyd'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'

const init = _ => {
  const state = {}
  return state
}

const closeButton = dir =>
  h('div.ff-dashboard-closeButton', {
    props: {innerHTML : '&times'}
  , hook: {insert: vnode => {
      let elm = vnode.elm
      elm.style[dir === 'left' ? 'right' : 'left'] = `-${elm.offsetWidth}px`
    }}
  })

const leftPanel = content =>
  h('div.ff-dashboard-leftPanel', [ 
    closeButton('left')
  , content
  ])

const mainPanel = content =>
  h('div.ff-dashboard-mainPanel', content)

const rightPanel = content =>
  h('div.ff-dashboard-rightPanel', content)

const header = content =>
  h('div.ff-dashboard-header', content)


const setHeight = _ => {
  let panels = document.querySelector('.ff-dashboard-panels') 
  if(!panels) return
  panels.style.height = '0px'
  let headerHeight = document.querySelector('.ff-dashboard-header').offsetHeight 
  let bodyHeight = document.body.offsetHeight
  panels.style.height = `${bodyHeight - headerHeight}px`
}

window.onresize = setHeight

const view = state => 
  h('div.ff-dashboard', [
    header('header')
  , h('div.ff-dashboard-panels'
    , {hook: {insert: setHeight}}
    , [ leftPanel('left')
      , mainPanel('main')
      , rightPanel('right')
      ]
    ) 
  ]) 




let container = document.querySelector('#container')

const patch = snabbdom.init([
  require('snabbdom/modules/class')
, require('snabbdom/modules/props')
, require('snabbdom/modules/style')
, require('snabbdom/modules/eventlisteners')
, require('snabbdom/modules/attributes')
])

render({patch, container, view, state: init()})

