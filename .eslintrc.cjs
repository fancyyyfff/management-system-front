/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-recommended'
    // 'plugin:vue/vue3-essential', // 或使用 
    // 'plugin:vue/vue3-essential',
    // 'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/no-multiple-template-root': 'off',
  },

}
