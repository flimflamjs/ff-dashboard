'use strict' 

module.exports = {
  use: ['postcss-import', 'autoprefixer']
, 'local-plugins' : true
, 'autoprefixers' : {browsers: 'last 2'}
, input: 'styles/index.css'
, output: 'dist/index.css'
}

