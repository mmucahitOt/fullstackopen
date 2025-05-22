FROM mongo:latest

# Expose the default MongoDB port
EXPOSE 27017

# Create a directory for MongoDB data
RUN mkdir -p /data/db

# Set the working directory
WORKDIR /data/db

# Command to run MongoDB
CMD ["mongod", "--bind_ip_all"]
