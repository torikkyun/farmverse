postgresql-dev:
	docker-compose -f docker-compose.dev.yml --env-file .env.development.local up -d --build postgresql

mysql-dev:
	docker-compose -f docker-compose.dev.yml --env-file .env.development.local up -d --build mysql

postgresql-init:
	pnpm dlx prisma init --datasource-provider postgresql --output ../generated/prisma

mysql-init:
	pnpm dlx prisma init --datasource-provider mysql --output ../generated/prisma

mongodb-init:
	pnpm dlx prisma init --datasource-provider mongodb --output ../generated/prisma

migrate-nosql:
	pnpm migrate:nosql

migrate-sql:
	pnpm migrate:sql

dev:
	pnpm start:dev
