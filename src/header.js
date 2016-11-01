import h from 'snabbdom/h'

module.exports = content => 
  h('div'
  , {attrs: { 'data-ff-dashboard-header' : ''}}
  , [content]
  )

