#!/bin/bash
source /home/ubuntu/anime_notifications/variables
if ! pgrep -f "node index.js" > /dev/null; then
	node index.js
	sleep 2
fi
