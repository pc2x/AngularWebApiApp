FROM node:18.18.2-alpine3.18 as  build
WORKDIR /app
RUN npm install -g npm@10.2.1
COPY . .
RUN npm install
RUN npm run build

# Serve Application using Nginx Server
FROM nginx:1.25.2-alpine3.18 as runtime
COPY --from=build /app/dist/angular-app /usr/share/nginx/html
EXPOSE 80