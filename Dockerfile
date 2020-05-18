FROM buildkite/puppeteer:latest

WORKDIR /usr/src/app

COPY package.json .

RUN npm i --only=production

# Bundle app source
COPY . .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD [ "npm", "start" ]
