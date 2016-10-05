import R from 'ramda'

// returns class object with highlight as the key and boolean as its value
// used for setting snabbdom classes
module.exports = (arr, name) => (
  {class: {highlight: 
    R.filter(x => x === name, arr || []).length}
  }
)
