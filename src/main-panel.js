import h from 'snabbdom/h'

const left = state => vnode => {
  let elm = vnode.elm
  let left = state.displayPanel$() === 'left'
    ? elm.parentElement.querySelector('[data-ff-dashboard-left-panel]').offsetWidth + 'px'
    : 0
  elm.style.left = left
}

module.exports = (state, content) => 
  h('div', {
    attrs: { 'data-ff-dashboard-main-panel' : ''}
  , style: { transition: `left ${state.transition}` }
  , hook: {update: vnode => {
        left(state)(vnode)
        window.addEventListener('resize', ev => left(state)(vnode))
      }
    }
  }   
, [h('div'
  , {attrs: { 'data-ff-dashboard-panel-body' : ''}}
  , [content])
  ]
)


