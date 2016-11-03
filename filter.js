import h from 'snabbdom/h'
import flyd from 'flyd'
import R from 'ramda'
import data from './data'

const hyph = st => st.replace(/\s/g, '-')

const check = name => id => 
  [
    h('input', {props: {type: 'checkbox', name: `${name}[]`, value: id, id: hyph(id)}})
  , h('label', {attrs: {for: hyph(id)}}, id)
  , h('br')
  ]


const clear = state => v => {
  if(R.keys(state.filterBy$()).length) return
  v.elm.reset()
}

const checkboxes = (state, arr, name) =>
  h('form'
  , {
      on: {change: state.filterInput$}
    , hook: {update: clear(state)}
    }
  , R.flatten(R.map(check(name), arr))
  )
  
const getPersonnel = _ => 
    R.uniq(R.reduce((a, b) => R.concat(a, R.map(x => x.name, b.personnel)), [], data))

module.exports = state => {
  const personnel = getPersonnel()

  return h('div.p-2', [
    h('p.mt-0.mb-2', 'Only show albums with...')
  , checkboxes(state, personnel, 'personnel')
  ])
}



