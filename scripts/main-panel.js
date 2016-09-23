import h from 'snabbdom/h'

module.exports = state => 
  h('div.ff-dashboard-mainPanel', {
    style: {
      transition: `width ${state.transition}, left ${state.transition}`
    , width: state.mainPanelWidth$() + '%'
    , left: state.displayPanel$() === 'left' ? `${state.leftPanelWidth}%` : 0
    }
  }   
, [state.mainPanelContent])

