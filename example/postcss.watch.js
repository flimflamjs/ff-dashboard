'use strict' 

module.exports = {
  use: [
    'postcss-import'
  , 'precss'
  , 'postcss-color-function']
, 'local-plugins' : true
, 'postcss-import': {onimport: sources => global.watchcss(sources, this.from)}
, input: 'example/index.css'
, output: 'example/build.css'
}

