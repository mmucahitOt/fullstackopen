# Build the image
docker build -t mongo-local .

# Run the container
docker run -d --name fullstackopen -p 27017:27017 mongo-local