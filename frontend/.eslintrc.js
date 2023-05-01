// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		'no-unused-vars': ['warn', { vars: 'all' }],
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-empty-function': 'off',
		indent: ['error', 'tab']
	}
};
