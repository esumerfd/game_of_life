#!/usr/bin/env ruby
$:.unshift "."
require 'life'

if ARGV[0] == "-h"
  puts "usage: start.sh <game name>"
  puts "Game names supported are:"
  Board.private_instance_methods.sort.each { |name|
    puts name[7..-1] if name =~ /create_/
  }
else
  type = "blinker"
  type = ARGV[0] if ARGV.size > 0

  life = GameOfLife.new(type)
  life.run(100)
end
