'use strict'

const path = require('path')

module.exports = {
  context: path.resolve('./'),
  resolve: {
    extensions: ['ejx', '.js', '.jsx', '.json'],
    alias: {
      'a': path.resolve('./src/')
    }
  }
}
