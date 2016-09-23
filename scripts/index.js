// npm
import h from 'snabbdom/h'
import flyd from 'flyd'
import R from 'ramda'

// local
import header from './header'
import mainPanel from './main-panel'
import leftPanel from './left-panel'
import rightPanel from './right-panel'

const init = state => {
  state = state || {}
  state = R.merge({
    displayPanel$: flyd.stream('main')
  , headerContent: '' 
  , mainPanelContent: '' 
  , leftPanelContent: '' 
  , rightPanelContent: '' 
  , leftPanelWidth: 20 
  , rightPanelWidth: 60 
  , transition: '0.2s ease-out'
  }, state)
  state.mainPanelWidth$ = flyd.map(setMainPanelWidth(state), state.displayPanel$)
  return state
}

const setMainPanelWidth = state => s => {
  if(s === 'right') return 100 - state.rightPanelWidth 
  if(s === 'left') return 100 - state.leftPanelWidth 
  return  100
}

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
  h('div.ff-dashboard', {attrs: {'data-display-panel': state.displayPanel$()}}, [
    header(state.headerContent)
  , h('div.ff-dashboard-panels'
    , {hook: {insert: setHeight}}
    , [ leftPanel(state)
      , mainPanel(state)
      , rightPanel(state)
      ]
    ) 
  ]) 

module.exports = {init, view}

