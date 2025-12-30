FROM node:22-alpine 


WORKDIR /client

COPY package*.json ./
COPY pnpm*.yaml ./  

RUN npm install -g pnpm

RUN pnpm install
# Copy the rest of your application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 3000
 
# Define the command to run your app
CMD ["pnpm", "dev"]