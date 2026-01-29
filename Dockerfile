# SVPG Exam System - Jekyll Docker Container
FROM ruby:3.2-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /srv/jekyll

# Copy Gemfile first for caching
COPY Gemfile ./

# Install Jekyll and dependencies
RUN gem install bundler && bundle install

# Copy the rest of the site
COPY . .

# Expose Jekyll's default port
EXPOSE 4000

# Set environment variables
ENV JEKYLL_ENV=production

# Build and serve the site
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000"]
