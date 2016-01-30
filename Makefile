# Everything at one place

build:
	npm run build

watch:
	npm run watch

test: lint
	npm test

install:
	npm install

update:
	npm update

run:
	nodemon dev.js | ./node_modules/.bin/bunyan -o short

lint:
	npm run lint

clean:
	rm -r ./node_modules ./public

.PHONY: build watch install update run lint test clean
