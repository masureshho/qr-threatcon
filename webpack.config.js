var path = require('path');
var args = require('minimist')(process.argv.slice(2));

// List of allowed environments
var allowedEnvs = ['dev', 'dist', 'test'];

// Set the correct environment
var env;
const branchName = process.env.BRANCH;
const environmentName = process.env.NODE_ENV;
const isStaging = branchName === 'develop' && (environmentName === 'production' || environmentName === 'staging');
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (process.env.ENV) {
  env = process.env.ENV;
} else if (args.env) { // develop branch is used for staging in netlify
  env = args.env;
} else {
  env = 'dev';
}
if (isStaging) env = 'staging';
process.env.REACT_WEBPACK_ENV = env;

// Get available configurations
const configs = {
  dev: require(path.join(__dirname, 'cfg/dev')),
  dist: require(path.join(__dirname, 'cfg/dist')),
  test: require(path.join(__dirname, 'cfg/test'))
};

/**
 * Get an allowed environment
 * @param  {String}  e
 * @return {String}
 */
function getValidEnv(e) {
  const isValid = e && e.length > 0 && allowedEnvs.indexOf(e) !== -1;
  return isValid ? e : 'dev';
}

/**
 * Build the webpack configuration
 * @param  {String} e Environment to use
 * @return {Object} Webpack config
 */
function buildConfig(e) {
  var usedEnv = getValidEnv(e);
  return configs[usedEnv];
}
module.exports = buildConfig(env);
