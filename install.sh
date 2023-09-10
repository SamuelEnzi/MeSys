#!/bin/bash
sudo apt install nodejs npm screen -y
sudo npm install -g n
n latest
cp .example.env .env
npm install

# Prompt the user for the external IP address
echo "Please enter the external IP address of the server (press Enter to automatically detect):"
read ip

if [ -z "$ip" ]; then
    ip=$(curl -s ifconfig.me)
fi

# Check if we got the IP
if [ -z "$ip" ]; then
    echo "Failed to get the IP address. Please try again."
    exit 1
fi

# Replace <BASEURL> with the desired string format and write to the parent directory
sed "s|<BASEURL>|http://${ip}:8080|g" server/server.lua > server.lua
nano .env