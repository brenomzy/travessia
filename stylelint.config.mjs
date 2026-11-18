// Token enforcement (SPEC §5.5.5). Raw values belong only in src/styles/tokens.css.
/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-declaration-strict-value'],
  overrides: [{ files: ['**/*.astro', '**/*.html'], customSyntax: 'postcss-html' }],
  ignoreFiles: ['src/styles/tokens.css', 'dist/**', 'tools/**', 'node_modules/**'],
  rules: {
    'color-no-hex': true,
    'color-named': 'never',
    'declaration-no-important': true,
    'selector-max-id': 0,
    'scale-unlimited/declaration-strict-value': [
      [
        '/color$/',
        'fill',
        'stroke',
        'font-size',
        'font-family',
        'gap',
        'row-gap',
        'column-gap',
        '/^margin/',
        '/^padding/',
        'border-radius',
        'box-shadow',
      ],
      {
        ignoreValues: [
          '0',
          'auto',
          'inherit',
          'initial',
          'unset',
          'none',
          'currentColor',
          'transparent',
          '100%',
          // Math on tokens is fine, e.g. calc(var(--space-s) * -1).
          '/^(calc|clamp|min|max)\\(.*var\\(--/',
        ],
        ignoreFunctions: false,
      },
    ],
  },
};
