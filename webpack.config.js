/* eslint-disable */
module.exports = function(env) {
  return require(`./webpack.config.${env && env.dev ? 'dev' : 'prod'}.js`);
};
