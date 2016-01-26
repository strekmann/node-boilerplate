REPORTER = spec

build:

production:
	npm install

watch:

hint:

locales:

test: hint
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui bdd

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--growl \
		--ui bdd \
		--watch

install:
	npm install

update:
	npm update

clean:
	rm -r ./node_modules ./bower_components ./dist

.PHONY: build production watch test test-w hint locales install update clean
