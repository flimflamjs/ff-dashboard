// npm
import h from 'snabbdom/h'
import flyd from 'flyd'
import filter from 'flyd/module/filter'
import R from 'ramda'

// local
import header from './header'
import mainPanel from './main-panel'
import leftPanel from './left-panel'
import rightPanel from './right-panel'

const init = state => {
  state = R.merge({
    displayPanel$: flyd.stream('main')
  , leftPanelWidth: 300 
  , leftPanelOffset: 80 
  , rightPanelWidth: 600
  , rightPanelOffset: 0
  , transition: '0.2s ease-out'
  }, state)
  
  const isShowingRightPanel$ = filter(x => x === 'right', state.displayPanel$)

  flyd.map(resetRightPanelScroll, isShowingRightPanel$)

  return state
}

const setHeight = panels => {
  panels.style.height = 0
  let headerHeight = document.querySelector('[data-ff-dashboard-header]').offsetHeight 
  let bodyHeight = document.body.offsetHeight
  panels.style.height = `${bodyHeight - headerHeight}px`
}

const resetRightPanelScroll = _ => {
  let elm = document.querySelector('[data-ff-dashboard-right-panel] [data-ff-dashboard-panel-body]') 
  if(!elm) return
  elm.scrollTop = 0
}

const view = (state, content) => 
  h('div'
  , {attrs: { 'data-ff-dashboard' : ''}}
  , [
      header(content.header || '')
    , h('div'
      , {
          attrs: { 'data-ff-dashboard-panels' : ''}
        , hook: {
            insert: vnode => {
              setHeight(vnode.elm)
              window.addEventListener('resize', ev => setHeight(vnode.elm))
            }
          , update: vnode => setHeight(vnode.elm)
          }
        }
      , [ leftPanel(state, content.leftPanel || '')
        , mainPanel(state, content.mainPanel || '')
        , rightPanel(state, content.rightPanel || '')
        ]
      ) 
    ]
  ) 

module.exports = {init, view}

