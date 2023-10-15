FROM node:18.13.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build


FROM nginx

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./ngnix-default.conf ./etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]