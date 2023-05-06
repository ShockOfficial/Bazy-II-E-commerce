// eslint-disable-next-line no-undef
module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended'
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react', '@typescript-eslint', 'prettier'],
	rules: {
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		'no-unused-vars': ['warn', { vars: 'all' }],
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-empty-function': 'off',
		'prettier/prettier': 'error',
		'linebreak-style': ['error', 'windows']
	}
};
