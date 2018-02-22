module.exports = {
  components: './src/components/**/*.js',
  webpackConfig: {
    module: {
      loaders: [{
        test: /\.js(\?[^?]*)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react'],
        },
      }],
    },
  },
};
