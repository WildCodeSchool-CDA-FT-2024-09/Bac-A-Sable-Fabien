FROM node:lts-alpine AS dev

WORKDIR /app
COPY *.json ./
RUN npm install
COPY src src
COPY data data
#RUN npm run seed # the seed will be ran from within the container
EXPOSE 4000

CMD ["npm", "run", "dev"]