# Using a base image by pulling Node.js LTS version (lts-alpine version keeps the Docker image smaller)
FROM node:lts-alpine


# Setting up the working directory inside the docker container
WORKDIR /usr/src/app


# Copying the 'package.json' and 'package-lock.json' from my file (host machine) to the container's working directory
# . at the end specifies destination's directory i.e. /usr/src/app in the container
# Format for copying is COPY [source] [destination]
COPY package*.json .


# This will run the command 'npm install' inside the container
# This will install the dependencies specified in the 'package.json' file
# This is executed during the build process to set up the application's dependencies within the container
RUN npm install


# Copies all the files from host machine's current working directory to '/app' directory inside the container
# First . refers to source and second . refers to destination
COPY . .


# Indicating which port the container uses
# Container will listen on port 5173 at runtime
EXPOSE 5173


# Specifying the default command to run when the container starts
# --host will configure the application's host settings
CMD npm run dev -- --host




# NOTE:
# When any changes are made in our host machine, let's say we install extra dependencies after the docker image is created
# Now, this change will be seen on 'package.json' file. So, to sync the changes we need to rebuild the docker image.
# So, if I put the command 'COPY . .' above 'RUN npm install' then for each changes in the host machine, the container will run the command 'npm install' and will install it each time
# Hence, to avoid this continuos installation we keep the command 'RUN npm install' above. Now, it will run this command just once and then copy all the other changes.


# Command to write on the terminal after this:
# cd '.\1 - To Do List Using TypeScript\' --> specifying the project directory by changing our cuurent directory
# docker compose build --> to rebuild the docker image if any changes occur
# docker compose up -d --> to run/launch the container
