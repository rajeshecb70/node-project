IMAGE_NAME = nodeproject
DOCKERFILE_PATH = Dockerfile
TAG = 1.0.0
# Install the dependencies
install:
	npm install

# Linting
lint:
	npx eslint server.js

# Run Tests
test:
	npm test

# Built artifact
build:
	docker build -t $(IMAGE_NAME):$(TAG) .

# Run the application
run:
	docker run -p 3000:3000 nodeproject