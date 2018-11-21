const staticServer = require('./static_server');
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  staticServer();
} else {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('./webpack.config');
  const open = require('open');

  new WebpackDevServer(webpack(config), config.devServer)
    .listen(config.port, '0.0.0.0', (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Listening at localhost: ${config.port}`);
      console.log('Opening your system browser...');
      open(`http://localhost:${config.port}/`);
    });
}
