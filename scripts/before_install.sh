#!/bin/bash

sudo apt update

# Install necessary packages
sudo apt install nginx git nodejs npm

# clone git repo
git clone https://github.com/Emmanuel-Bolanos/firstServerExpress /home/ubuntu/
