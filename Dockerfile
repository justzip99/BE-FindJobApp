FROM node:latest
WORKDIR /app
COPY ./ /app
RUN npm install
RUN npm install ts-node --save-dev
RUN npm run build
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]