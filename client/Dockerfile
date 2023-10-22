# get the base node image
FROM node:alpine as builder

# set the working dir for container
WORKDIR /client

# copy the json file first
COPY ./package.json /client

# install npm dependencies
RUN npm install

# copy other project files
COPY . .

# build the folder
RUN npm run dev

# Handle Nginx
# FROM nginx
# COPY --from=builder /client/dist /usr/share/nginx/html
# COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf