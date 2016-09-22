// npm
import h from 'snabbdom/h'
import flyd from 'flyd'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'

const init = _ => {
  const state = {
    displayPanel$: flyd.stream('left')
  , headerContent: 'header'
  , mainPanelContent: 'main'
  , leftPanelContent: 'left'
  , rightPanelContent: h('h1', 'asdf asdlkj asdflkj asdflkj asdflkj asdflkjas df') 
  , leftPanelWidth: 20 
  , rightPanelWidth: 60 
  , transitionTime: 0.3
  }
  state.mainPanelWidth$ = flyd.map(setMainPanelWidth(state), state.displayPanel$)
  return state
}

const setMainPanelWidth = state => s => {
  if(s === 'right') 
    return 100 - state.rightPanelWidth 
  if(s === 'left') 
    return 100 - state.leftPanelWidth 
  return  100
}

const closeButton = state => dir =>
  h('div.ff-dashboard-closeButton', {
    on: {click: _ => state.displayPanel$('main')}
  , props: {innerHTML : '&times'}
  , hook: {insert: vnode => {
      let elm = vnode.elm
      elm.style[dir === 'left' ? 'right' : 'left'] = `-${elm.offsetWidth}px`
    }}
  })

const leftPanel = state =>
  h('div.ff-dashboard-leftPanel', {
    style: {
      transition: `left ${state.transitionTime}s ease-out`
    , left: state.displayPanel$() === 'left' ? 0 : `-${state.leftPanelWidth}%`
    , width: state.leftPanelWidth + '%'
    }
  }
, [ 
    closeButton(state)('left')
  , state.leftPanelContent
  ])

const rightPanel = state =>
  h('div.ff-dashboard-rightPanel', {
    style: {
      transition: `right ${state.transitionTime}s ease-out`
    , right: state.displayPanel$() === 'right' ? 0 : `-${state.rightPanelWidth}%`
    , width: state.rightPanelWidth + '%'
    }
  }
, [ 
    closeButton(state)('right')
  , state.rightPanelContent
  ])

const mainPanel = state => 
  h('div.ff-dashboard-mainPanel', {
    style: {
      transition: `width ${state.transitionTime}s ease-out, left ${state.transitionTime}s ease-out`
    , width: state.mainPanelWidth$() + '%'
    , left: state.displayPanel$() === 'left' ? `${state.leftPanelWidth}%` : 0
    }
  }   
, state.mainPanelContent)



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
    header(state.headerContent)
  , h('div.ff-dashboard-panels'
    , {hook: {insert: setHeight}}
    , [ leftPanel(state)
      , mainPanel(state)
      , rightPanel(state)
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

