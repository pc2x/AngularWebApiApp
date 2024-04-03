FROM node:18.18.2-alpine3.18 as  build
WORKDIR /app
RUN npm install -g npm@10.2.1
COPY . .
RUN npm install
RUN npm run build

# Serve Application using Nginx Server
FROM nginx:1.25.2-alpine3.18 as runtime
COPY --from=build /app/dist/keyboard-store /usr/share/nginx/html

# Copia el archivo de configuración personalizado
COPY ./default.conf /etc/nginx/conf.d/default.conf

ENV API_URL=http://webapi:80

EXPOSE 80