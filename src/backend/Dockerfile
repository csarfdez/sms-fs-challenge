FROM node:12-alpine

RUN mkdir -p /usr/app/server

WORKDIR /usr/app/server

COPY . ./

RUN npm install 

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait

RUN chmod +x /wait

EXPOSE 4000

CMD /wait && npm run seed && npm run start