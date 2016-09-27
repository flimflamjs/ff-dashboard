import h from 'snabbdom/h'
import flyd from 'flyd'
import R from 'ramda'
import data from './data'

const input = (type, name) => value =>
  h('div.small', [
    h('input', {props: {type, name, value}})
  , h('span.pl1', value)
  ])

const checkboxes = (arr, name) =>
  h('div', R.map(x => input('checkbox', name)(x), arr))
  
const getPersonnel = _ => 
    R.uniq(R.reduce((a, b) => R.concat(a, R.map(x => x.name, b.personnel)), [], data))


module.exports = state => {
  // let instruments = R.map(x => R.concat(R.map(y => y.instruments, x.personnel)), data)
  let personnel = getPersonnel()

  return h('div', [
    h('p.bold.mt0.mb1', 'Personnel')
  , checkboxes(personnel, 'personnel')
  ])
}



