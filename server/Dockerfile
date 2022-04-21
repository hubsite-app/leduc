FROM node:lts-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -qy

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
