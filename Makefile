REPORTER = spec

build:
	@./node_modules/.bin/grunt

production:
	npm install
	@./node_modules/.bin/grunt prod

watch:
	@./node_modules/.bin/grunt watch

hint:
	@./node_modules/.bin/grunt hint

locales:
	@./node_modules/.bin/grunt locales

test: hint
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui bdd

install:
	npm install

update:
	npm update

clean:
	rm -r ./node_modules ./public

.PHONY: build production watch test hint locales install update clean
