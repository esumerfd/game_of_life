require 'stringio'

class GameOfLife
  attr_reader :board

  def initialize(type = nil)
    @board = Board.new

    @board.setup(type)
  end

  def run(iterations = 10)
    puts @board.to_s
    iterations.times { |number|
      puts "clear"
      puts @board
      puts "Tick: #{number} of #{iterations}, ctrl-c to exit"
      tick
    }
  end

  private
  def rule(cell)
    action = lambda {}
    action = lambda { cell.die } if cell.alive? && cell.neibors < 2
    action = lambda { cell.born  } if cell.dead? && cell.neibors == 3
    action = lambda { cell.die  } if cell.alive? && cell.neibors > 3
    action
  end

  def tick
    actions = []

    @board.each_cell do |cell|
      actions << rule(cell)
    end

    actions.each { |action| action.call }
  end

  def to_s
    puts "Game of Life - Current Status"
    @board.to_s
  end
end

class Board
  attr_reader :position

  def initialize(width = 20)
    @width = width
    @position = init_board(width)
  end

  def init_board(width)
    (0..@width-1).collect { |x| [0] * @width }
  end

  def setup(type)
    self.send("create_#{type}") if type
  end

  def last_column?(x)
    x == @width - 1
  end
  
  def at(x, y, value = nil)
    return 0 if x < 0 || x >= @width || y < 0 || y >= @width
    @position[x][y] = value if value != nil
    @position[x][y] || 0
  end

  def cell(x, y)
    Cell.new(self, x, y)
  end

  def each_cell(x = nil, y = nil)
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
    each_cell(x, y) do |cell|
      counter += 1 if cell.alive?
    end
    counter
  end

  def to_s
    output = StringIO.new
    output << "-- "
    @width.times { |x|
      output << "#{x % 10}"
    }
    output << "\n"

    @width.times { |y|

      output << sprintf("%02d ", y)
      @width.times { |x| 
        cell = Cell.new(self, x, y)
        output << cell.to_s
        output << "\n" if cell.last_in_row?
      }
    }
    output.string
  end

  private
  def create_block
    layout "##\n##\n"
  end
  def create_beacon
    layout <<-LAYOUT
    ##
    # 
       #
      ##
    LAYOUT
  end
  def create_blinker
    layout "###"
  end
  def create_glider
    layout <<-LAYOUT
      #
    # #
     ##
    LAYOUT
  end
  def create_growth1
    layout <<-LAYOUT
          #
        # ##
        # #
        #
      #
    # #
    LAYOUT
  end
  def create_gosper_glider_gun
    layout <<-LAYOUT
                            #
                          # #
                ##      ##            ##
               #   #    ##            ##
    ##        #     #   ##
    ##        #   # ##    # #
              #     #       #
               #   #
                ##
    LAYOUT
  end

  def layout(format)
    lines = format.split("\n")

    # Ignore blank columns on left
    left_offset = lines.collect { |line| line.index("#") }.min

    # Sizes
    max_width = lines.collect { |line| line.size - left_offset }.max
    max_height = lines.size

    new_width = [max_width, max_height].max * 2
    new_width = 64 if new_width > 64 # My screen isn't that big
    if new_width > @width
      @width = new_width
      @position = init_board(new_width)
    end

    # Position
    left = (@width / 2) - (max_width / 2)
    top = (@width / 2) - (max_height / 2)

    row = 0
    lines.each do |line|
      column = 0
      line.each_char do |char|
        if column >= left_offset
          @position[left + column - left_offset][top + row] = 1 if char == "#"
        end
        column += 1
      end
      row += 1
    end
    
    self
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
    @board.last_column?(@x)
  end

  def debug
    "#{@x}x#{@y}:#{to_s}"
  end

  def to_s
    alive? ? "#" : "_"
  end
end
