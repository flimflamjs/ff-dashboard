import h from 'snabbdom/h'

const leftWidth = state => vnode => {
  let elm = vnode.elm
  let left = state.displayPanel$() === 'left'
    ? elm.parentElement.querySelector('.ff-dashboard-leftPanel').offsetWidth + 'px'
    : 0
  elm.style.left = left
}
  

module.exports = state => 
  h('div.ff-dashboard-mainPanel', {
    style: { transition: `left ${state.transition}` }
  , hook: {update: leftWidth(state)}
  }   
, [state.mainPanelContent])



