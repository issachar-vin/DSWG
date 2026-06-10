.PHONY: setup dev lint format test clean

setup:
	npm install

dev:
	docker compose up

lint:
	npx eslint . --fix

format:
	npx prettier --write .

test:
	npm run build

clean:
	docker compose down
	rm -rf node_modules dist
