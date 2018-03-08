const { resolve } = require('path')
const { safeLoad } = require('js-yaml')
const { readFileSync } = require('fs')

const configPath = resolve('config', 'webpacker.yml')
const DEFAULT = 'production'

const env = () => {
  const railsEnv = process.env.RAILS_ENV
  const config = safeLoad(readFileSync(configPath), 'utf8')
  const availableEnvironments = Object.keys(config).join('|')
  const regex = new RegExp(availableEnvironments, 'g')

  if (railsEnv && railsEnv.match(regex)) return railsEnv

  /* eslint no-console: 0 */
  console.warn(`RAILS_ENV=${railsEnv} environment is not defined in config/webpacker.yml, falling back to ${DEFAULT}`)
  return DEFAULT
}

module.exports = env()
