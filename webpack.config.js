/* eslint-disable no-undef */
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    },
  mode: 'development'
};
