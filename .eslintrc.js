module.exports = {
    extends: ['react-app'],
    plugins: ['jest', 'cypress'],
    parser: 'babel-eslint',
    env: {
      browser: true,
      'cypress/globals': true,
      es6: true,
      'jest/globals': true,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };