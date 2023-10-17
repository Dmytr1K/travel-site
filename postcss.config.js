/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");

module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-mixins")({
      mixinsDir: path.join(__dirname, "app/assets/styles/mixins"),
    }),
    require("postcss-simple-vars"),
    require("postcss-nested"),
    require("postcss-calc"),
    require("autoprefixer"),
  ],
};
