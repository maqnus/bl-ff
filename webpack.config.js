const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    room: './src/apps/rooms/index.js',
    style: './src/styles/styles.scss',
    main: './src/apps/main.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'stylesheets/styles.css'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader?-url'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 200000, // int (in bytes)
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that proves asset filenames
      return assetFilename.endsWith('css') || assetFilename.endsWith('.js');
    }
  },
  devtool: 'source-map',
  target: 'web'
};

module.exports = config;
