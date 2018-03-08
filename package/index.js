/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const { resolve } = require('path')
const { existsSync } = require('fs')
const Environment = require('./environments/base')
const loaders = require('./rules')
const config = require('./config')
const devServer = require('./dev_server')

const createEnvironment = () => {
  const path = resolve(__dirname, 'environments', `${process.env.NODE_ENV}.js`)
  const constructor = existsSync(path) ? require(path) : Environment
  return new constructor()
}

module.exports = {
  config,
  devServer,
  environment: createEnvironment(),
  Environment,
  loaders
}
