install-be:
	cd back-end && \
	pnpm install

install-bc:
	cd blockchain && \
	pnpm install

install-fe:
	cd front-end && \
	npm install

be: 
	cd back-end && \
	make dev

fe:
	cd front-end && \
	npm run dev
	