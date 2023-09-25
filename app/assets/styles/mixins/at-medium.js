const atMedium = (mixin) => ({
  "@media (min-width: 800px)": {
    "@mixin-content": {},
  },
});

module.exports = atMedium;
