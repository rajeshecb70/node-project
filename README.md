## Objective
Node.js Demo Project Deployed Using CI/CD Pipeline for System Information.
## Install the node packages
```bash
sudo apt-get update -y
sudo apt-get install nodejs -y
sudo apt-get install npm -y
sudo npm install -g pm2 -y
```
## Check npm and node version
```bash 
node -v
npm -v
pm2 -v
```
## Install the dependencies
```bash
npm install --save express
npm install --save os-utils
```

## Initialize the node project 
```bash
npm init -y
```
## Run the application
```bash
pm2 start server.js --name nodeproject
pm2 save
```
## Check the application end points
    - curl http://localhost:3000/cpu
    - curl http://localhost:3000/uptime
