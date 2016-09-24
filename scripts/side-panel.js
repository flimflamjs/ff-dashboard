import h from 'snabbdom/h'
import closeButton from './close-button'

module.exports = (state, header, body, dir) => {
  let isLeft = dir === 'left' 
  let width = isLeft ? state.leftPanelWidth : state.rightPanelWidth 
  let style = {
      transition: `${dir} ${state.transition}, visibility ${state.transition}`
    , visibility: state.displayPanel$() === dir ? 'visible' : 'hidden' 
    , width
    }
  style[dir] = state.displayPanel$() === dir ? 0 : `-${width}` 
  return h(`div.ff-dashboard-${dir}Panel`, {style}, [ 
   h('div.ff-dashboard-panelHeader', [
      isLeft ?  header : closeButton(state)
    , !isLeft ?  header : closeButton(state)
      ])
  , h('div.ff-dashboard-panelBody', [body])
  ])
}

