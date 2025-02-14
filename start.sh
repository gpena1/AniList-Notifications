#!/bin/bash

if ! pgrep -f "node index.js" > /dev/null; then
	node index.js &
	sleep 2
fi
sudo -E ./query.sh
