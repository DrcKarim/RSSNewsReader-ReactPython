# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your frontend app
COPY . .

# Expose the React development server port
EXPOSE 3000

# Start the React app in development mode
CMD ["npm", "start"]