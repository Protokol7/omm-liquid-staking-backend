FROM node:18-alpine As development

RUN apk --no-cache add --virtual .builds-deps build-base python3

WORKDIR /app

ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN npm install && npm rebuild bcrypt --build-from-source

COPY . .

RUN npm run build

FROM node:18-alpine As production

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN apk --no-cache add --virtual .builds-deps build-base python3 && npm install --only=production

COPY . .

COPY --from=development /app/dist/ ./dist/

CMD ["node", "dist/main.js"]
