#!/bin/bash
apt install nodejs npm screen -y
npm install -g n
n latest

cp .env.example .env

npm install

nano .env