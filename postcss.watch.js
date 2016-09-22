'use strict' 

module.exports = {
  use: ['postcss-import']
, 'local-plugins' : true
, 'postcss-import': {onimport: sources => global.watchcss(sources, this.from)}
, input: 'styles/index.css'
, output: 'dist/index.css'
}

