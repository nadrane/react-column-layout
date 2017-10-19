const path = require('path');

module.exports = {
  entry: './demo/index.js',
  output: {
    path: __dirname,
    filename: './demo/bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['babel-preset-react', 'babel-preset-env']
        },
      },
    ]
  }
};