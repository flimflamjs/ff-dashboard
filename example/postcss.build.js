'use strict' 

module.exports = {
  use: ['postcss-import', 'autoprefixer', 'cssnano']
, 'local-plugins' : true
, 'autoprefixers' : {browsers: 'last 2'}
, input: 'example/index.css'
, output: 'example/build.css'
}

