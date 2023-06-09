module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        jest: true,
        mocha: true,
    },
    extends: 'airbnb-base',
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'windows'],
    },
};
