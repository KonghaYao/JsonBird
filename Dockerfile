FROM node

COPY ./package.json /data/package.json
COPY ./app.mjs /data/app.mjs

WORKDIR /data
RUN npm install
CMD ["node","app.mjs"]