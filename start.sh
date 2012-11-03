#!/bin/bash
########################################
# Starts the Game of Life and animates
# each tick
########################################

if [[ $1 == "-h" ]]; then
  start_life.rb -h
  exit 1
fi

clear
start_life.rb $1 | while read line; do 
  if [[ $line == "clear" ]]; then 
    sleep 0.2
    clear
  else 
    echo "$line"
  fi
done
