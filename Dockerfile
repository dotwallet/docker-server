FROM node:12-alpine

RUN mkdir -p /usr/src/node_modules
ENV PATH /usr/src/node_modules/.bin:$PATH
ENV PORT 80
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
# RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 80 

CMD ["yarn", "start"]