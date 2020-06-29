const { paths } = require('react-app-rewired')
const rewireAliases = require('react-app-rewire-aliases')
const path = require('path')

module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({
    '@components': path.resolve(__dirname, `${paths.appSrc}/components/`),
    react: path.resolve(__dirname, `./node_modules/react`),
    'styled-components': path.resolve(
      __dirname,
      `./node_modules/styled-components`,
    ),
  })(config, env)
  return config
}
