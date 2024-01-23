FROM node:16
WORKDIR /app

COPY . .
RUN npm install
RUN npm build

EXPOSE 5000

CMD ["npm", "start"]
