module.exports = {
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['.eslintrc.js', '**/dist/**'],
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-extra-semi': 'off',
    "dot-notation": "off",
    "import/order": "off",
    "max-len": [2, { "code": 150 }],
    "no-useless-constructor": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "arrow-parens": "off",
    "sort-keys": "off",
    "comma-dangle": "off"
  }
}