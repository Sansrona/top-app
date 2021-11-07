FROM node:14
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
ENV NODE_ENV production
RUN npm run buil
RUN npm prune --production
CMD ["npm", "start"]
EXPOSE 3000