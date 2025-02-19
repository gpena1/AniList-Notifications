#!/bin/bash
DIR=/home/ubuntu/anime_notifications
source $DIR/variables
anime=$(echo "{\"query\": \"$(cat $DIR/querystructure.txt)\", \"variables\": { \"name\": \"$ANILIST_USER\" }}" | sudo curl -sX POST "https://graphql.anilist.co" -H "Content-Type: application/json" --data @-) 
$DIR/parse_list.js "$anime"
