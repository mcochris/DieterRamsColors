module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:sonarjs/recommended",
		"plugin:json/recommended"
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}",
				"*.html"
			],
			"parser": "@html-eslint/parser",
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
	},
	"plugins": [
		"@typescript-eslint",
		"sonarjs",
		"@html-eslint"
	],
	"rules": {
	}
}
