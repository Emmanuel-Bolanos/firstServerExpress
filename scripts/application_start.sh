#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ubuntu/firstServerExpress

# Remove previous folder
sudo rm -rf /var/www/firstServerExpress
sudo mkdir /var/www/firstServerExpress

# move to git folder
cd /home/ubuntu/firstServerExpress

#install node modules
sudo npm install

# stop and delete all previous pm2 process
pm2 stop all
sleep 1
pm2 delete all
sleep 1

# start our node app in the background
pm2 start app.js 

# start nginx server
sudo service nginx start
