/* eslint-disable import/no-extraneous-dependencies */
const postcss = require("postcss");

const atExtraLarge = (mixin) => {
  const rule = new postcss.AtRule({ name: "media", params: "(min-width: 1200px)" });
  rule.append(mixin.nodes);
  mixin.replaceWith(rule);
};

module.exports = atExtraLarge;
