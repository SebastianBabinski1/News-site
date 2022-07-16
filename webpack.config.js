const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src',
    library: './src/favouriteArticles'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
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
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: { localIdentName: '[local]__[hash:base64:5]' } } },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  devServer: {
    open: true,
    port: 9000,
  },

  plugins: [
    new HtmlWebpackPlugin({ filename: 'index.html', template: 'index.html', chunks: ['index'] }),
    new HtmlWebpackPlugin({ filename: 'library.html', template: 'library.html', chunks: ['library'] }),
  ],
};
