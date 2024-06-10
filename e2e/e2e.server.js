const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const dev = require('../webpack.dev');

const server = new WebpackDevServer(webpack(dev), {});
server.listen(3000, 'localhost', (err) => {
  if (err) {
    return;
  }
  if (process.send) {
    process.send('ok');
  }
});