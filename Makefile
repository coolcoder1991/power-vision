.PHONY: build

init:
	pyenv install -sf 3.11
	pyenv local 3.11

build:
	rm -fr dist/ build/
	poetry install
	poetry build

pre-commit-init:
	cd backend && poetry run pre-commit install --hook-type pre-push
	cd backend && poetry run pre-commit run --all-files

up:
	docker compose up -d
	cd backend && poetry run alembic upgrade head

down:
	docker compose down

site:
	cd frontend && tsc --watch

api:
	cd api && npm run start:dev

