# Stage 1: Build
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy dependencies files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve
FROM node:18 AS runner

# Install a simple static server
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the built files from the builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Run the app
CMD ["serve", "-s", "dist", "-l", "3000"]
