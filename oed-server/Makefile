.PHONY: up down build test tdd

debug=none

up:
	docker-compose up

down:
	docker-compose down

build:
	docker-compose up --build

test:
	docker-compose exec -e DEBUG=$(debug) oed-bff npm run test

tdd:
	docker-compose exec -e DEBUG=$(debug) oed-bff npm run test:dev
