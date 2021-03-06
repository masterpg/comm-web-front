module.exports = {
  'root': true,
  'env': {
    'node': true,
    'es6': true,
  },
  'parserOptions': {
    'parser': '@typescript-eslint/parser',
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'plugins': ['@typescript-eslint', 'prettier'],
  'rules': {
    'prettier/prettier': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never',
      },
    ],
    'comma-spacing': ['error', {'before': false, 'after': true}],
    'computed-property-spacing': ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-dupe-class-members': 'off',
    'no-empty': 'off',
    'no-undef': 'off',
    'no-unreachable': 'error',
    'no-var': 'error',
    'object-curly-spacing': ['error', 'never'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never', {'beforeStatementContinuationChars': 'never'}],
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always',
      },
    ],
    'space-in-parens': ['error', 'never'],
    'variable-name': {
      'options': [
        'ban-keywords',
        'check-format',
        'allow-leading-underscore',
        'allow-trailing-underscore',
        'allow-pascal-case',
        'allow-snake-case',
      ],
    },
    '@typescript-eslint/camelcase': ['error', {allow: ['^m_', '^f_']}],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/indent': ['off', 2],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': {
          'delimiter': 'none',
        },
        'singleline': {
          'delimiter': 'semi',
          'requireLast': false,
        },
      },
    ],
    '@typescript-eslint/no-angle-bracket-type-assertion': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/type-annotation-spacing': ['error'],
  },
}
