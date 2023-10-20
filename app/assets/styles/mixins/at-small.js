/* eslint-disable import/no-extraneous-dependencies */
const postcss = require("postcss");

const atSmall = (mixin) => {
  const rule = new postcss.AtRule({ name: "media", params: "(min-width: 576px)" });
  rule.append(mixin.nodes);
  mixin.replaceWith(rule);
};

module.exports = atSmall;
