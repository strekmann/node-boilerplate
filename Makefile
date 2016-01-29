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
	nodemon

lint:
	npm run lint

clean:
	rm -r ./node_modules ./public

.PHONY: build watch install update run lint test clean
