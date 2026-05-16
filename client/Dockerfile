# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install simple HTTP server for static files
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY package*.json ./

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
