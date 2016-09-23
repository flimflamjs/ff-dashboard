import h from 'snabbdom/h'
import closeButton from './close-button'

module.exports = (state, content, dir) => {
  let width = dir === 'left' ? state.leftPanelWidth : state.rightPanelWidth 
  let style = {
      transition: `${dir} ${state.transition}, visibility ${state.transition}`
    , visibility: state.displayPanel$() === dir ? 'visible' : 'hidden' 
    , width
    }
  style[dir] = state.displayPanel$() === dir ? 0 : `-${width}` 
  return h(`div.ff-dashboard-${dir}Panel`, {style}, [ 
    closeButton(state)(dir)
  , content
  ])
}

