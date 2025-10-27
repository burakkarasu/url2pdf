# Use playwright official image
FROM mcr.microsoft.com/playwright:v1.56.1-noble

# Establish workdir
WORKDIR /opt

# Copy manifest
COPY package.json package-lock.json* ./

# Install deps
RUN npm ci
# Build application
RUN npm rebuild

# Copy actual source
COPY ./src ./src

ENTRYPOINT ["npm", "run", "pdf", "--"]
