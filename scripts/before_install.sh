#!/bin/bash

sudo apt update
sudo apt upgrade

# Install necessary packages
sudo apt install nginx git nodejs npm

# clone git repo
git clone https://github.com/Emmanuel-Bolanos/firstServerExpress /home/ubuntu/