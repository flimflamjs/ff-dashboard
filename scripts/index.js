// npm
import h from 'snabbdom/h'
import flyd from 'flyd'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'

const init = _ => {
  const state = {
    displayPanel$: flyd.stream('main')
  , headerContent: 'header'
  , mainPanelContent: 'main'
  , leftPanelContent: 'left'
  , rightPanelContent: 'right'
  , leftPanelWidth: 20 
  , rightPanelWidth: 60 
  }
  state.panelWidths$ = flyd.map(setPanelWidths(state), state.displayPanel$)
  return state
}

const setPanelWidths = state => s => {
  if(s === 'right') {
    let rightWidth = state.rightPanelWidth ? state.rightPanelWidth : 50
    return {
      main: 100 - rightWidth,
      left: 0,
      right: rightWidth,
    }
  }
  if(s === 'left') {
    let leftWidth = state.leftPanelWidth ? state.leftPanelWidth : 30
    return {
      main: 100 - leftWidth,
      left: leftWidth,
      right: 0,
    }
  }
  return {
    main: 100,
    left: 0,
    right: 0,
  }
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

const mainPanel = state => 
  h('div.ff-dashboard-mainPanel', {
    style: {width: state.panelWidths$().main + '%'}
  }   
, state.mainPanelContent)


const rightPanel = content =>
  h('div.ff-dashboard-rightPanel', [ 
    closeButton('right')
  , content
  ])

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
    , [ leftPanel('left')
      , mainPanel(state)
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

