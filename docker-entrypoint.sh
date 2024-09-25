#!/bin/bash


# Apply database migrations
npm run migrate:gen
npm run migrate:run

# Start server
echo "Starting server"
npm run start:dev