const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.resolve(__dirname, '..', '../');

const babelLoaderConfiguration = {
  test: /\.js$/,
  include: [path.resolve(rootDir, 'index.js'), path.resolve(rootDir, 'src')],
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/env', '@babel/react'],
      plugins: ['react-native-web'],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

module.exports = {
  entry: [path.resolve(rootDir, 'index.js')],
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(rootDir, 'dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [babelLoaderConfiguration, imageLoaderConfiguration],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './web/public/index.html',
    }),
  ],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      'native-base': 'native-base-web',
      'react/lib/ReactNativePropRegistry':
        'react-native-web/dist/modules/ReactNativePropRegistry',
    },
    extensions: ['.web.js', '.js'],
  },
};
