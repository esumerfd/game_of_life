#!/bin/bash
clear
start_life.rb | while read line; do 
  if [[ $line == "clear" ]]; then 
    sleep 1
    clear
  else 
    echo "$line"
  fi
done
