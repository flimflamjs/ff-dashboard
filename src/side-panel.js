import R from 'ramda'
import h from 'snabbdom/h'
import closeButton from './close-button'

module.exports = (state, body, dir) => {
  let isLeft = dir === 'left' 
  let style = {
      transition: `${dir} ${state.transition}, visibility ${state.transition}`
    , visibility: state.displayPanel$() === dir ? 'visible' : 'hidden' 
    }

  const attrs = {}
  attrs[`data-ff-dashboard-${dir}-panel`] = ''

  return h('div', {
    style
  , attrs
  , hook: {
      insert: vnode => {
        setWidth(state, isLeft)(vnode.elm)
        window.addEventListener('resize', ev => setWidth(state, isLeft)(vnode.elm))
      }
    , update: vnode => {
        let elm = vnode.elm
        elm.style[dir] = (dir === state.displayPanel$() ? 0 : `-${elm.offsetWidth}px`)
      }
    }
  }
  , [ h('div'
    , {attrs: { 'data-ff-dashboard-panel-body' : ''}}
    , R.concat([closeButton(state)], [body])) 
    ]
  )
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

