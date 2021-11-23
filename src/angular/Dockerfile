FROM node:12-alpine

RUN mkdir -p /usr/app/angular

WORKDIR /usr/app/angular

COPY . ./

RUN npm install

EXPOSE 4200
CMD npm start
