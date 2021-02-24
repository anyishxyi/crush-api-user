FROM node:lts-alpine3.13
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
WORKDIR /opt/app
ADD . /opt/app
EXPOSE 3001
CMD [ “npm”, “start” ]