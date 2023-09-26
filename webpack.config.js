/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { url: false } },
          { loader: "postcss-loader" },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            // "lite",
            "default",
            // "advanced",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundled.css",
    }),
  ],
};
