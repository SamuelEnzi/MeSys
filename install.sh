#!/bin/bash
sudo apt install nodejs npm screen -y
npm install -g n
n latest

cp .example.env .env

npm install

nano .env