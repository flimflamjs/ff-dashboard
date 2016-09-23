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
  state = R.merge({
    displayPanel$: flyd.stream('main')
  , leftPanelWidth: '300px' 
  , rightPanelWidth: '500px'
  , transition: '0.2s ease-out'
  }, state)
  return state
}

const setHeight = panels => {
  panels.style.height = '0px'
  let headerHeight = document.querySelector('.ff-dashboard-header').offsetHeight 
  let bodyHeight = document.body.offsetHeight
  panels.style.height = `${bodyHeight - headerHeight}px`
}

const view = (state, content) => 
  h('div.ff-dashboard', {attrs: {'data-display-panel': state.displayPanel$()}}, [
    header(content.header)
  , h('div.ff-dashboard-panels'
    , {hook: {insert: vnode => {
        setHeight(vnode.elm)
        window.addEventListener('resize', ev => setHeight(vnode.elm))
        }
      }
    }
    , [ leftPanel(state, content.leftPanel || '')
      , mainPanel(state, content.mainPanel || '')
      , rightPanel(state, content.rightPanel || '')
      ]
    ) 
  ]) 

module.exports = {init, view}

