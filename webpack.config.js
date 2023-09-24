/* eslint-disable global-require */
const path = require("path");

module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app"),
  },
  devServer: {
    watchFiles: ["app/**/*.html"],
    static: {
      directory: path.join(__dirname, "app"),
      watch: false,
    },
    hot: true,
    port: 3000,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { url: false } },
          { loader: "postcss-loader" },
        ],
      },
    ],
  },
};
