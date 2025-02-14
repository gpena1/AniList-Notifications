#!/bin/bash
anime=$(echo "{\"query\": \"$(cat querystructure.txt)\", \"variables\": { \"name\": \"$ANILIST_USER\" }}" | sudo curl -sX POST "https://graphql.anilist.co" -H "Content-Type: application/json" --data @-)
sudo ./parse_list.js "$anime" > /etc/cron.d/my_cron_jobs && sudo chmod 644 /etc/cron.d/my_cron_jobs
