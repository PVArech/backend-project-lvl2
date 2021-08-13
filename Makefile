install: # Эта команда полезна при первом клонировании репозитория (или после удаления node_modules).
	npm ci

genDiff:
	node bin/genDiff.js

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8	

lint:
	npx eslint .

lintFix:
	npx eslint . --fix

asci:
	asciinema rec

publish:
	npm publish --dry-run

.PHONY: test