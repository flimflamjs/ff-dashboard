import h from 'snabbdom/h'

const left = state => vnode => {
  let elm = vnode.elm
  let left = state.displayPanel$() === 'left'
    ? elm.parentElement.querySelector('.ff-dashboard-leftPanel').offsetWidth + 'px'
    : 0
  elm.style.left = left
}

module.exports = (state, content) => 
  h('div.ff-dashboard-mainPanel', {
    style: { transition: `left ${state.transition}` }
  , hook: {update: left(state)}
  }   
, [h('div.ff-dashboard-panelBody', [content])])


