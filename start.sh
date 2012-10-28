#!/bin/bash
clear
start_life.rb $1 | while read line; do 
  if [[ $line == "clear" ]]; then 
    sleep 0.2
    clear
  else 
    echo "$line"
  fi
done
