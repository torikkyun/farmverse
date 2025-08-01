i-be:
	cd back-end && \
	pnpm install

i-bc:
	cd blockchain && \
	pnpm install

i-fe:
	cd front-end && \
	npm install

be: 
	cd back-end && \
	make dev

fe:
	cd front-end && \
	npm run dev

dev:
	docker compose -f docker-compose-dev.yml up -d --build
	
prod:
	docker compose -f docker-compose.yml --env-file .env.production.local up -d --build
