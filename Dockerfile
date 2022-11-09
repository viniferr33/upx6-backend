FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY src/infra/database/Firestore/serviceAccountKey.json dist/src/infra/database/Firestore/serviceAccountKey.json 

CMD npm start