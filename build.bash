#!/usr/bin/bash

bun install
bun run build

# Update crontab 
echo $(cat ./crontab) | crontab -

# Restart cron
sudo service cron restart

# Restart the pm2 server
pm2 stop meta-lang.com
pm2 delete meta-lang.com
pm2 start server.mjs --name meta-lang.com