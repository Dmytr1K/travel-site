const atSmall = (mixin) => ({
  "@media (min-width: 530px)": {
    "@mixin-content": {},
  },
});

module.exports = atSmall;
