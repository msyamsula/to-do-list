pwd
ls
source .env
sudo docker-compose down
sudo docker rmi $DOCKER_USERNAME/$IMAGE
sudo docker-compose up -d
# sudo gcloud compute ssh $VM_NAME --command "cd $GCP_WORKDIR && sudo ls"
# sudo gcloud compute ssh $VM_NAME --command "cd $GCP_WORKDIR && sudo docker-compose down"
# sudo gcloud compute ssh $VM_NAME --command "cd $GCP_WORKDIR && sudo rm -rf docker-compose.yml"
# sudo gcloud compute scp ./docker-compose.yml $VM_NAME:$GCP_WORKDIR/docker-compose.yml
# sudo gcloud compute ssh $VM_NAME --command "cd $GCP_WORKDIR && sudo docker rmi $DOCKER_USERNAME/$IMAGE"
# sudo gcloud compute ssh $VM_NAME --command "cd $GCP_WORKDIR && sudo docker pull $DOCKER_USERNAME/$IMAGE"
# sudo gcloud compute ssh $VM_NAME --command "cd $GCP_WORKDIR && sudo docker-compose up -d"