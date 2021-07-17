install: # Эта команда полезна при первом клонировании репозитория (или после удаления node_modules).
	npm ci
genDiff:
	node bin/genDiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
lintFix:
	npx eslint . --fix
asci:
	asciinema rec