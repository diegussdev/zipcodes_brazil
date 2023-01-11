FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
RUN npm i -g @nestjs/cli

# Bundle app source
COPY . .

RUN chown -R root /usr/src/app

EXPOSE 3000
