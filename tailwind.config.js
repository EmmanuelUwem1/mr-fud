module.exports = {
  theme: {
    extend: {
      animation: {
        ripple: "ripple 600ms ease-out",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0)", opacity: 0.5 },
          "100%": { transform: "scale(4)", opacity: 0 },
        },
      },
    },
  },
};
