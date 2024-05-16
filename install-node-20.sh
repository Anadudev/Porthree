#!/usr/bin/env bash
# this is a script to  install nodejs v20 in linux
# please ensure you update the file permissions to make the file executable
# you can achieve this by running "chmod u+x install-node-20.sh" in your linux cli
# Start the installation by running ./install-node-20.sh

sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
