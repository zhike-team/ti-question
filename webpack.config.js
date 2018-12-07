const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        use: ['babel-loader'],
      }, {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        use: ['eslint-loader'],
      }, {
        test: /\.(png|jpg|gif|ttf)$/,
        use: [{
          loader: 'url-loader',
        }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};
