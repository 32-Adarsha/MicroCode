FROM node:21.6.1

WORKDIR /vite-app

EXPOSE 5173

COPY package.json  ./

RUN npm install --force

COPY . .

CMD ["npm", "run", "dev"]