#!/bin/bash

sudo apt-get update
sudo apt-get upgrade

# Install necessary packages
sudo apt-get install nginx git -y
sudo apt install nodejs npm -y

# clone git repo
git clone https://github.com/Emmanuel-Bolanos/firstServerExpress /home/ubuntu/
