FROM node:16

WORKDIR /Users/Hamza/Desktop/nestJs/students/students

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "start:dev"]