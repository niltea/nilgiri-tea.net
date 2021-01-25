module.exports = {
  root: true,
  env : {
    browser: true,
    node   : true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'key-spacing'   : ['warn', { align: 'colon' }],
    'no-unused-vars': ['warn'],
    'comma-dangle'  : ['warn', 'always-multiline'],
    semi            : ['warn', 'always'],
  },
};
