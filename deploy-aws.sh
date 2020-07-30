ls
pwd
source .env
sudo docker-compose down
sudo docker rmi "$DOCKER_USERNAME/$IMAGE"
sudo docker-compose up -d