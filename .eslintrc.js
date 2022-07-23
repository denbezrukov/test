module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:react-hooks/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        indent: ['error', 4],
        'react/react-in-jsx-scope': 'off',
        'import/extensions': ['error', 'never'],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        'import/prefer-default-export': 'off',
        'react/function-component-definition': 'off',
        'arrow-body-style': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['**/*.stories.tsx'] },
        ],
    },
};
