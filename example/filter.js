import h from 'snabbdom/h'
import flyd from 'flyd'
import R from 'ramda'
import data from './data'


const checkboxes = (state, arr, name) =>
  h('form', {on: {change: state.filterInput$}}
  , R.flatten(
      R.map(x => [
        h('input', {props: {type: 'checkbox', name, value: x}})
      , h('span.pl1', x)
      , h('br')
      ], arr)
    )
  )
  
const getPersonnel = _ => 
    R.uniq(R.reduce((a, b) => R.concat(a, R.map(x => x.name, b.personnel)), [], data))

module.exports = state => {
  let personnel = getPersonnel()

  return h('div', [
    h('p.bold.mt0.mb1', 'Personnel')
  , checkboxes(state, personnel, 'personnel')
  ])
}



