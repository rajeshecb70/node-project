# Search for .env File
ifneq (,$(wildcard ./.env))
    include .env
    export
endif
DOCKER_USER = rajeshecb70
DOCKER_IMAGE = nodeproject
TAG = 2.0.0
# Install the dependencies
install:
	npm install -i

# Linting
lint:
	npx eslint server.js

# Run Tests
test:
	npm test

# Built artifact
docker-build:
	@echo "Building Docker image"
	docker build -t $(DOCKER_IMAGE):$(TAG) .

docker-build:
	@echo "Building Docker image"
	docker build -t $(DOCKER_IMAGE):$(TAG) .
	@echo "Tagging Docker image"
	docker tag $(DOCKER_IMAGE):$(TAG) $(DOCKER_USER)/$(DOCKER_IMAGE):$(TAG)

# Docker login
docker-login:
	docker login -u $(DOCKER_USERNAME) -p $(DOCKER_PASSWORD)
# Upload the Artifact 
docker-push: docker-login 
	@echo "Pushing Docker image to Docker Hub..."
	echo "$(DOCKER_USER)/$(DOCKER_IMAGE):$(TAG)"
	docker push $(DOCKER_USER)/$(DOCKER_IMAGE):$(TAG)

# Run the application
#run:
#	docker run -p 3000:3000 $(DOCKER_IMAGE):$(TAG)