#!/usr/bin/env ruby
$:.unshift "."
require 'life'

type = "blinker"
type = ARGV[0] if ARGV.size > 0

life = GameOfLife.new(type)
life.run(100)
