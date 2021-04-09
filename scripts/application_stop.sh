#!/bin/bash

#Stop existing node servers
pkill node

# Remove previous folder
sudo rm -rf /var/www/firstServerExpress
sudo mkdir /var/www/firstServerExpress
