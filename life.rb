require 'stringio'

class GameOfLife
  attr_reader :board

  def initialize(type = nil)
    @board = Board.new

    @board.send("create_#{type}") if type
  end

  def tick
    actions = []

    @board.scan do |cell|
      neibors = cell.neibors
      actions << lambda { cell.die } if cell.alive? && neibors < 2
      actions << lambda { cell.born  } if cell.dead? && neibors == 3
      actions << lambda { cell.die  } if cell.alive? && neibors > 3
    end

    actions.each { |action| action.call }
  end

  def run(iterations = 10)
    puts @board.to_s
    iterations.times {
      puts "clear"
      puts @board.to_s
      tick
    }
  end

end

class Board
  attr_reader :width, :position

  def initialize(width = 20)
    @width = width
    @position = (0..@width-1).collect { |x| [0] * @width }
  end

  def create_block
    @position[10][10] = 1
    @position[11][10] = 1
    @position[10][11] = 1
    @position[11][11] = 1
  end
  def create_beacon
    @position[10][10] = 1
    @position[11][10] = 1
    @position[10][11] = 1

    @position[13][12] = 1
    @position[13][13] = 1
    @position[12][13] = 1
  end
  def create_blinker
    @position[9][10] = 1
    @position[10][10] = 1
    @position[11][10] = 1
  end
  
  def at(x, y, value = nil)
    return 0 if x < 0 || x >= @width || y < 0 || y >= @width
    @position[x][y] = value if value != nil
    @position[x][y] || 0
  end

  def cell(x, y)
    Cell.new(self, x, y)
  end

  def scan(x = nil, y = nil)
    if (x && y)
      (x-1..x+1).each { |cell_x| 
        (y-1..y+1).each { |cell_y| 
          yield cell(cell_x, cell_y) unless cell_x == x && cell_y == y
        }
      }
    else
      @width.times { |x| @width.times { |y| yield cell(x, y) } }
    end
  end

  def neibors(x, y)
    counter = 0
    scan(x, y) do |cell|
      counter += 1 if cell.alive?
    end
    counter
  end

  def to_s
    output = StringIO.new
    @width.times { |y|
      @width.times { |x| 
        cell = Cell.new(self, x, y)
        output << cell.to_s
        output << "\n" if cell.last_in_row?
      }
    }
    output.string
  end
end

class Cell
  attr_reader :x, :y, :board
  def initialize(board, x, y)
    @board = board
    @x = x
    @y = y
  end

  def value
    @board.at(@x, @y)
  end

  def neibors
    @board.neibors(@x, @y)
  end

  def alive?
    value == 1
  end

  def dead?
    !alive?
  end

  def die
    @board.at(@x,@y, 0)
  end

  def born
    @board.at(@x,@y, 1)
  end

  def last_in_row?
    @x == @board.width - 1
  end

  def debug
    "#{@x}x#{@y}:#{to_s}"
  end

  def to_s
    alive? ? "X" : "_"
  end
end
