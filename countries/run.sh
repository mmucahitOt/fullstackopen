#!/bin/bash

if [ -z "$1" ]; then
  echo "Error: API key is required"
  echo "Usage: ./run.sh YOUR_API_KEY"
  exit 1
fi

export VITE_API_KEY=$1

echo "Starting application with API key: $VITE_API_KEY"
npm run dev

