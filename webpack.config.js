// webpack.config.js
const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/app.js', // Your entry file (e.g., app.js)
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
};
