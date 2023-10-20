rebuild-docker-image:
	docker-compose build && \
	docker-compose down && \
	docker-compose up -d
