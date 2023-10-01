const clearfix = (mixin) => ({
  "&::after": {
    display: "table",
    clear: "both",
    content: '""',
  },
});

module.exports = clearfix;
