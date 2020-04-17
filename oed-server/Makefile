.PHONY: up down build test tdd

debug=none

up:
	docker-compose up

down:
	docker-compose down

build:
	docker-compose up --build

test:
	docker-compose exec -e DEBUG=$(debug) oed-pua-api npm run test

tdd:
	docker-compose exec -e DEBUG=$(debug) oed-pua-api npm run test:dev

secret:
	@echo $(value) > tmp && \
	gcloud kms encrypt --location=global --keyring=pge-keyring --key=pge-api-key --ciphertext-file=tmp.enc --plaintext-file=tmp --project gcp-csweb-dev-d78c && \
	echo "\nSecret Value:\n" && \
	cat tmp.enc | base64 && \
	rm tmp && \
	rm tmp.enc && \
	echo "\n\nSecret above. NOTE: KMS configurations are static and should be matched to the appropriate .env"

peek:
	@echo $(value) | base64 --decode > tmp.enc && \
	gcloud kms decrypt --location=global --keyring=pge-keyring --key=pge-api-key --ciphertext-file=tmp.enc --plaintext-file=tmp --project gcp-csweb-dev-d78c && \
	cat tmp && \
	rm tmp && \
	rm tmp.enc
