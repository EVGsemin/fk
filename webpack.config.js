const
  path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');


module.exports = {
  entry: {
    "notused": "./fk/libry/forker/js/notused.js",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "")
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.pug")
    }),
    new MergeIntoSingleFilePlugin({
      files: {
        "fk.js": [
          './fk/libry/forker/js/modules/run.js',
          './fk/libry/forker/js/modules/window-load.js',
          './fk/libry/forker/js/modules/document-ready.js',
          './fk/libry/forker/js/modules/fk-click-action.js',
          './fk/libry/forker/js/modules/fk-format.js',
          './fk/libry/forker/js/modules/fk-get-param.js',
          './fk/libry/forker/js/modules/fk-icon.js',
          './fk/libry/forker/js/modules/fk-listen-transition.js',
          './fk/libry/forker/js/modules/fk-load-map.js',
          './fk/libry/forker/js/modules/fk-load-progressive.js',
          './fk/libry/forker/js/modules/fk-video.js',
          './fk/libry/forker/js/modules/to-rgb.js'
        ],
        "uk.js": [
          './node_modules/uikit/dist/js/uikit.min.js',
          './node_modules/uikit/dist/js/uikit-icons.min.js'
        ]
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ],
  }
};

