FROM node:lts-alpine3.13
RUN mkdir -p /usr/src/services/user
WORKDIR /usr/src/services/user
COPY package.json /usr/src/services/user/
RUN npm install
COPY . /usr/src/services/user
EXPOSE 3001
CMD [ “npm”, “start” ]