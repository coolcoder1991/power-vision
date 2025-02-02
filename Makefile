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
	cd frontend && npm run dev

apis:
	cd api && npm run start:dev

backup:
	rm -rf backend/data/dump.sql
	docker exec -t dg_postgres pg_dump -d powervision -c -U admin > backend/data/dump.sql

restore:
	cat backend/data/dump.sql | docker exec -i dg_postgres psql -U admin -d powervision

prod:
	docker compose -f docker-compose.prod.yml up -d

prod-down:
	docker compose down --remove-orphans