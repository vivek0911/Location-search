const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.scss/,
    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?minimize=true!sass-loader' }),
  },
  {
    test: /\.css/,
    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?minimize=true' }),
  },
//   {
//     test: /\.(svg|png|jpg|jpeg|woff|woff2|ttf|eot)$/,
//     loader: 'url-loader',
//     options: {
//       name: '[name].[ext]?[hash]',
//       limit: 10000,
//     },
//   },
];
module.exports = {
  name: 'browser',
  entry: {
    app: [path.resolve(__dirname, './client/index.js')],
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  module: {
    loaders: commonLoaders,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.BROWSER': true,
    //   'process.env.NODE_ENV': JSON.stringify('production'),
    // }),
    // new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('style.css'),
    // new webpack.IgnorePlugin(/vertx/),
  ],
};
