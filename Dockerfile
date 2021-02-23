FROM node:lts-alpine3.13
RUN mkdir -p /usr/src/api-user
WORKDIR /usr/src/api-user
COPY package.json /usr/src/api-user/
RUN npm install
COPY . /usr/src/api-user
ENV CI=true
EXPOSE 3001
CMD [ “npm”, “start” ]