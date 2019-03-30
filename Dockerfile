FROM node:latest

WORKDIR /var/app

COPY ./ /var/app

RUN npm install

CMD ["npm", "run", "dev"]