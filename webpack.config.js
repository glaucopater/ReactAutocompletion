/*
    ./webpack.config.js
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})
module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
    
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      //{ test: /\.less$/, loader: 'less-loader', exclude: /node_modules/ },
        
        {
      test: /\.less$/,
      loaders: ['style-loader', 'css-loader', 'less-loader']
    }

    ]
  },
  plugins: [HtmlWebpackPluginConfig]

}