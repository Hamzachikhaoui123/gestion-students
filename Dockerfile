# 
FROM node:16

# Installer dockerize
RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -xvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    mv dockerize /usr/local/bin/ && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

WORKDIR /app
COPY . .

RUN npm install
CMD ["npm", "run", "start:dev"]
