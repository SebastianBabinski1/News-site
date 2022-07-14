const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
  },
  mode: 'development',
  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.js$|ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: { localIdentName: '[local]__[hash:base64:5]' } } },
          'sass-loader',
        ],
      },
    ],
  },

  devServer: {
    open: true,
    port: 9000,
  },

  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
};
