const path = require('path');
const webpack = require('webpack');
const StartServerPlugin = require('start-server-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const envify = require('process-envify');

const env = require('./env');

const SOURCE_ROOT = path.join(__dirname, 'src');
const DISTRIBUTION_ROOT = path.join(__dirname, 'dist');

module.exports = ({ prod } = {}) => ({
  mode: prod ? 'production' : 'development',
  context: SOURCE_ROOT,
  entry: [!prod && 'webpack/hot/poll?1000', './server.js'].filter(Boolean),
  output: {
    path: DISTRIBUTION_ROOT,
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '~': SOURCE_ROOT,
    },
  },
  plugins: [
    new webpack.DefinePlugin(envify(env)),
    !prod && new webpack.HotModuleReplacementPlugin(),
    !prod && new StartServerPlugin({ name: 'server.js' }),
  ].filter(Boolean),
  devtool: prod ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
  ],
});
