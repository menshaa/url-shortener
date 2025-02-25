# Use a Node.js image that supports nodemon and debugging
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Optionally install nodemon globally if not listed in your package.json
RUN npm install -g nodemon

# Copy your application code
COPY . .

# Expose your application port and the Node.js debugging port
EXPOSE 3000
EXPOSE 9229

# Run nodemon with the inspector enabled on all network interfaces
CMD ["nodemon", "--inspect=0.0.0.0:9229", "server.js"]
