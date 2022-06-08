FROM node:latest
WORKDIR /srv/app
COPY package*.json .
RUN npm install --global nodemon
RUN npm install --global typescript
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]