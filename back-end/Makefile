postgresql-dev:
	docker-compose -f docker-compose.dev.yml --env-file .env.development.local up -d --build postgresql

mysql-dev:
	docker-compose -f docker-compose.dev.yml --env-file .env.development.local up -d --build mysql

dev:
	pnpm start:dev
