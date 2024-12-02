## Node.js CI Pipeline with Docker and Azure Deployment

### Project Objective

This project automates the process of building, testing, linting, and deploying a Node.js application using Docker and Azure. The pipeline, powered by GitHub Actions, ensures that when changes are pushed to the `main` branch, the application is built, tested, and deployed to an Azure server with Docker. It also allows easy access to monitor the server's CPU and uptime metrics.

### Prerequisites

Before using this project, ensure the following prerequisites are set up:

#### 1. **Docker**
   - Install Docker on your local machine and on the Azure server where the application will be deployed.
   - Follow the official Docker installation guide: [Install Docker](https://docs.docker.com/engine/install/ubuntu/).

#### 2. **Azure Server Setup**
   - Set up an Azure virtual machine (VM) or server to deploy the application.
   - Ensure SSH access is enabled with a valid user who has the necessary privileges to run Docker commands.

#### 3. **GitHub Secrets Configuration**
   You must configure the following secrets in your GitHub repository to securely store credentials:
   - `DOCKERHUB_USERNAME`: Your DockerHub username.
   - `DOCKERHUB_TOKEN`: Your DockerHub access token.
   - `AZURE_SERVER_USERNAME`: The username for your Azure server.
   - `AZURE_SERVER_PASSWORD`: The password for SSH access to the Azure server.
   - `AZURE_SERVER_IP`: The IP address of your Azure server.

#### 4. **Makefile**
   The repository includes a `Makefile` that automates common tasks. Ensure it includes:
   - `make install`: Installs the required dependencies for the Node.js project.
   - `make lint`: Runs linting checks to ensure code quality.
   - `make test`: Runs unit and integration tests to ensure the application functions correctly.
   - `make docker-build`: Build the docker image(artifact) using the Dockerfile and tag it.
   - `make docker-push`: Push the docker image (artifact) in dockerHub.
   - `make docker-run`: Run the application locally.

### Setup and Configuration

#### 1. **GitHub Actions CI Pipeline**
   The project uses GitHub Actions to automate the CI/CD pipeline. The pipeline is defined in `.github/workflows/nodejs-ci.yml`.

   The pipeline consists of the following steps:
   1. **Checkout code**: Pulls the latest code from the repository.
   2. **Set up Node.js environment**: Sets up Node.js 18.x using the `actions/setup-node` action.
   3. **Install dependencies**: Executes `make install` to install project dependencies.
   4. **Run linting**: Executes `make lint` to run linting checks.
   5. **Run tests**: Executes `make test` to run the test suite.
   6. **Docker login**: Logs into DockerHub using credentials stored as GitHub secrets.
   7. **Docker build and push**: Builds the Docker image and pushes it to DockerHub with a dynamic tag (`2.2.0` by default).
   8. **Deploy to Azure**: SSHs into the Azure server, installs Docker if necessary, pulls the latest Docker image, and restarts the Docker container with the updated image.

#### 2. **Deploying to Azure**
   The CI pipeline deploys the application to Azure by SSH-ing into the server and performing the following:
   - Installing Docker (if it's not already installed).
   - Pulling the latest Docker image from DockerHub (`rajeshecb70/nodeproject:${TAG}`).
   - Running the Docker container with the latest image on port `3000`.

   If Docker is not installed on the Azure server, the pipeline automatically installs it using a set of commands in the workflow.

#### 3. **Running the Project Locally**
   To run the Node.js application locally, follow these steps:

   1. Clone the repository:
      ```bash
      git clone https://github.com/rajeshecb70/node-project.git
      cd node-project
      ```

   2. Install dependencies:
      ```bash
      make install
      ```

   3. Build docker image:
      ```bash
      make docker-build
      ```
   4. Run the application using the docker images:
      ```bash
      make docker-run
      ```
      The application will be available at `http://localhost:3000/uptime` `http://localhost:3000/cpu`

#### 4. **Updating the Docker Image**
   To update the Docker image version, modify the `TAG` environment variable in the `.github/workflows/nodejs-ci.yml` file. For example, change the `TAG` value from `2.2.0` to a new version like `2.3.0`:
   ```yaml
   env:
     TAG: 2.3.0
   ```
#### 5. **Accessing the Application: You can access two important endpoints**
```yaml
# CPU Metrics:
http://<Server_IP>:3000/cpu
# Uptime Metrics
http://<Server_IP>:3000/uptime
```
#### 5. **Image snapshots**
pipeline: ![Pipeline](snapshots/pipeline.png)

Node_app on AzureServer: ![Node_app on AzureServer](snapshots/app_run_on_azure_server.png)

CPU_Info: ![CPU_Info](snapshots/CPU_info.png)

Uptime_Info: ![Uptime_Info](snapshots/uptime_info.png)
