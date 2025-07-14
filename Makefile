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
	
prod:
	docker compose up -d --build
