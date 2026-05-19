# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy dependency files for better caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Pass build args if needed (e.g. for Vite environment variables)
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the nginx config template.
# The official nginx alpine image will automatically substitute ${PORT} from env vars on startup.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy built frontend files to nginx serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Cloud Run sets the PORT env variable (default is 8080)
EXPOSE 8080
