FROM node:18.13.0 as build

WORKDIR /home/node

COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build

# Etap produkcyjny
FROM node:18.13.0

WORKDIR /home/node

# Skopiuj pliki z etapu budowy
COPY --from=build  /home/node/package*.json ./
COPY --from=build  /home/node/node_modules/ ./node_modules/
COPY --from=build  /home/node/dist/ ./dist/

CMD [ "npm", "run", "start:prod" ]