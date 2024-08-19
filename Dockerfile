#stage 1
FROM node:lts as node
WORKDIR /app
COPY . .
RUN npm install -f
RUN npm run build

#Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/alumni-web-angular/browser /usr/share/nginx/html

#stage3 
COPY /src/nginx.conf /etc/nginx

#stage4
COPY /src/nginx/default.conf /etc/nginx/conf.d/