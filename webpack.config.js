const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: "tiComponent",
    libraryTarget: 'umd',
    globalObject: 'this',
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
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
    "@zhike/ti-ui": {
      root: 'ti-ui',
      commonjs: 'ti-ui',
      commonjs2: 'ti-ui',
      amd: 'ti-ui',
    },
    "aphrodite": {
      root: 'aphrodite',
      commonjs: 'aphrodite',
      commonjs2: 'aphrodite',
      amd: 'aphrodite',
    },
    "axios": {
      root: 'axios',
      commonjs: 'axios',
      commonjs2: 'axios',
      amd: 'axios',
    },
    "lodash": {
      root: 'lodash',
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
    },
    "form-data": {
      root: 'formData',
      commonjs: 'formData',
      commonjs2: 'formData',
      amd: 'formData',
    },
    "history": {
      root: 'history',
      commonjs: 'history',
      commonjs2: 'history',
      amd: 'history',
    },
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
