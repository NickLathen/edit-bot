module.exports = {
  entry: ['./client/src/index'],
  output: {
    filename: 'bundle.js',
    path: './client/build',
    publicPath: '/client',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
      }
    ]
  }
};
