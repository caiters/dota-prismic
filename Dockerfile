FROM node:10.19.0
LABEL maintainer="ayashi@valefor.com"
EXPOSE 3000
RUN mkdir /app
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
