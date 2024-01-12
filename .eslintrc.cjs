module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // "plugin:react-hooks/recommended", //注释hooks 校验
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react-refresh","react", "@typescript-eslint"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "arrow-body-style": 0,
    "jsx-a11y/label-has-for": 0,
    // "max-lines-per-function": [
    //   2,
    //   { max: 320, skipComments: true, skipBlankLines: true },
    // ],
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "no-confusing-arrow": 0,
    "no-nested-ternary": 0,
    "@typescript-eslint/no-unused-vars": "off",
    // "no-console": 2,
    "no-param-reassign": [
      2,
      { props: true, ignorePropertyModificationsFor: ["draft"] },
    ],
    "react/no-this-in-sfc": 0,
    "react/prop-types": 0,
    "react/display-name": "off",
  },
};
