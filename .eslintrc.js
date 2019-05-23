module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true
  },
  plugins: ["jest", "no-only-tests"],
  extends: ["airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "import/prefer-default-export": 0,
    "no-use-before-define": ["error", { functions: false }],
    "no-console": 0
  }
};
