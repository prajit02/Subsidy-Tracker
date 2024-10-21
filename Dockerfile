# Backend
FROM node:16-alpine

WORKDIR /app
COPY ./server ./server
COPY ./frontend ./frontend

WORKDIR /app/server
RUN npm install

EXPOSE 5000
CMD ["npm", "run", "dev"]