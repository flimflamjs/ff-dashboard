import h from 'snabbdom/h'

module.exports = state => dir =>
  h('div.ff-dashboard-closeButton', {
    on: {click: _ => state.displayPanel$('main')}
  , props: {innerHTML : '&times'}
  , hook: {insert: vnode => {
      let elm = vnode.elm
      elm.style[dir === 'left' ? 'right' : 'left'] = `-${elm.offsetWidth}px`
    }}
  , style: {
      transition: `opacity ${state.transition}`
    , opacity: state.displayPanel$() === dir ? 1 : 0 
    }
  })

