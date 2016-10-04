import h from 'snabbdom/h'
import closeButton from './close-button'

module.exports = (state, header, body, dir) => {
  let isLeft = dir === 'left' 
  let style = {
      transition: `${dir} ${state.transition}, visibility ${state.transition}`
    , visibility: state.displayPanel$() === dir ? 'visible' : 'hidden' 
    }

  return h(`div.ff-dashboard-${dir}Panel`, {
    style
  , hook: {insert: vnode => {
      setWidth(state, isLeft)(vnode.elm)
      setHeight(vnode.elm)
      window.addEventListener('resize', ev => setHeight(vnode.elm))
      window.addEventListener('resize', ev => setWidth(state, isLeft)(vnode.elm))
      }
    , update: vnode => {
        let elm = vnode.elm
        elm.style[dir] = (dir === state.displayPanel$() ? 0 : `-${elm.offsetWidth}px`)
        setHeight(elm)
      }
    }
  }, [ 
   h('div.ff-dashboard-panelHeader', [
      isLeft ?  header : closeButton(state)
    , !isLeft ?  header : closeButton(state)
      ])
  , h('div.ff-dashboard-panelBody', [body])
  ])
}

const setHeight = panel => {
  let header = panel.parentElement.querySelector('.ff-dashboard-panelHeader')
  panel.style.paddingTop = header.offsetHeight + 'px' 
}

const setWidth = (state, isLeft) => panel => {
  let parentWidth = panel.parentElement.offsetWidth
  let width = isLeft ? state.leftPanelWidth : state.rightPanelWidth 
  let offset = isLeft ? state.leftPanelOffset : state.rightPanelOffset 
  let remainder = parentWidth - offset
  panel.style.width = parentWidth >= width + offset
    ? width + 'px'
    : remainder + 'px' 
}

