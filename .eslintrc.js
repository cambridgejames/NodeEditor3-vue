module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/standard",
    "@vue/typescript/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    indent: ["error", 2],
    "space-before-function-paren": 0,
    quotes: ["error", "double"],
    "quote-props": ["error", "as-needed"],
    semi: ["error", "always"],
    "no-empty": "error",
    "no-unused-vars": "off"
  }
};
