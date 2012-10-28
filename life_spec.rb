require 'rubygems'
require 'rspec'

require 'life'

RSpec::Matchers.define :be_alive do
  match do |actual|
    actual == 1
  end

  failure_message_for_should do |actual|
    "expected it to be alive but, alas, it is dead."
  end

  failure_message_for_should_not do |actual|
    "expected it to be dead but it is alive and kicking"
  end

end

describe GameOfLife do
  context "blank board" do
    it "starts with initial world" do
      life = GameOfLife.new
      life.board.create_block

      life.board.at(10, 10).should be_alive
      life.board.at(11, 10).should be_alive
      life.board.at(10, 11).should be_alive
      life.board.at(11, 11).should be_alive
    end

    it "starts by creating a cell for a stable conclusion" do
      life = GameOfLife.new
      life.board.create_block

      life.tick

      #
      # Before
      #
      #   XX
      #   X
      #
      # After
      #
      #   XX
      #   XX
      #
      life.board.at(10, 10).should be_alive
      life.board.at(11, 10).should be_alive
      life.board.at(10, 11).should be_alive
      life.board.at(11, 11).should be_alive
    end

    it "ossilating blinker" do
      life = GameOfLife.new
      life.board.create_blinker

      life.tick

      #
      # Before
      #
      #   XXX
      #
      # After
      #
      #   X
      #   X
      #   X
      #
      life.board.at(10, 9).should be_alive
      life.board.at(10, 10).should be_alive
      life.board.at(10, 11).should be_alive

      life.board.at(9, 10).should_not be_alive
      life.board.at(11, 10).should_not be_alive
    end
  end
end

describe Board do
  context "creates" do
    it "has the correct value" do
      board = Board.new

      board.at(0, 0).should == 0
      board.at(19, 19).should == 0

      board.at(20, 20).should == 0
      board.at(0, 20).should == 0
      board.at(20, 0).should == 0
      board.at(100, 100).should == 0
      board.at(-1, -1).should == 0
    end
  end

  context "scan" do
    it "scans the neibors only missing the center" do
      scanned = []

      board = Board.new
      board.at(10, 10, 1)
      board.scan(10, 10) { |cell|
        scanned << cell if cell.dead?
      }

      scanned.size.should == 8
    end
  end

  context "neibors" do
    it "counts none" do
      board = Board.new
      board.neibors(0, 0).should == 0
      board.neibors(10, 10).should == 0
      board.neibors(19, 19).should == 0

      board.neibors(100, 100).should == 0
    end

    it "counts all" do
      board = Board.new
      board.scan { |cell|
        cell.born
      }
      board.neibors(0, 0).should == 3
      board.neibors(10, 10).should == 8
      board.neibors(19, 19).should == 3

      board.neibors(100, 100).should == 0
    end
  end
end

describe Cell do

  it "is alive" do
    Cell.new(double(Board, :at => 1), 0, 0).alive?.should be_true
    Cell.new(double(Board, :at => 0), 0, 0).alive?.should_not be_true
  end
end
