.PHONY: build

init:
	pyenv install -sf 3.11
	pyenv local 3.11

build:
	rm -fr dist/ build/
	poetry install
	poetry build

pre_commit_init:
	poetry run pre-commit install --hook-type pre-push
	poetry run pre-commit run --all-files

up:
	docker compose up -d
	poetry run alembic upgrade head

down:
	docker compose down

site:
	cd frontend && tsc --watch

api:
	cd batter_api && npm run start:dev

