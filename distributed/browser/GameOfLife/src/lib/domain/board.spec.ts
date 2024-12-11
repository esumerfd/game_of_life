import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board, Cell, Location } from './board';

describe('Cell', function() {
  describe("from", function() {
    it('list of characters', function() {
      const row = Cell.from("000000")

      expect(row.length).toBe(6)
    })

  })

  describe("has", function() {
    ;[
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 0, y: 1},
      {x: 2, y: 1},
      {x: 0, y: 2},
      {x: 1, y: 2},
      {x: 2, y: 2},
    ].forEach((data) => {
      it(`no neibours ${data.x}, ${data.y}`, function() {
          let board = Board.fromTemplate(
            `___
             ___
             ___`)

          const cell = board.at(0, 0)

          expect(cell.neibors()).toBe(0)
      })
    })

    it('no neibours', function() {
        let board = Board.fromTemplate(
          `___
           _x_
           ___`)

        const cell = board.at(1, 1)

        expect(cell.neibors()).toBe(0)
    })

    ;[
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 0, y: 1},
      {x: 2, y: 1},
      {x: 0, y: 2},
      {x: 1, y: 2},
      {x: 2, y: 2},
    ].forEach((data) => {
      it(`neibours: x:${data.x}, y:${data.y}`, function() {
          let board = Board.fromTemplate(
            `___
             _x_
             ___`)

          board.at(data.x, data.y).born()

          const centerCell = board.at(1, 1)

          expect(centerCell.neibors()).toBe(1)
      })
    })
  })
})

describe('Board', function() {
  describe('initializes', function() {
    it('state empty', function() {
      const board = Board.init()

      expect(board).toBeTruthy()
      expect(board.hasLife()).toBe(false)
    })

    it('state with life', function() {
      const board = Board.init()

      board.addLife()

      expect(board).toBeTruthy()
      expect(board.hasLife()).toBe(true)
    })

    it('encode board', function() {
      const emptyTemplate = Board.template(
        `__________
         __________
         __________
         __________
         __________
         __________
         __________
         __________
         __________
         __________`)

      const emptyBoard = Board.fromTemplate(
        `__________
         __________
         __________
         __________
         __________
         __________
         __________
         __________
         __________
         __________`)

      expect(emptyBoard.encode()).toEqual(emptyTemplate)
    })
  })

  describe("initializes from template", function () {
    it("empty", function() {
      let board = Board.fromTemplate(
        `__________
         __________
         __________
         __________
         __________
         __________
         __________
         __________
         __________
         __________`)

      expect(board.hasLife()).toBeFalse()
    })

    it("has life", function() {
      let board = Board.fromTemplate(
        `__________
         __________
         __________
         __________
         __________
         _____x____
         __________
         __________
         __________
         __________`)

      expect(board.hasLife()).toBeTrue()
    })
  })

  describe('has cell at', function() {
    let board = Board.fromTemplate(
      `___
       _x_
       x__`)

    it('0 0', function() {
      const cell = board.at(0, 0)

      expect(cell.location.x).toBe(0)
      expect(cell.location.y).toBe(0)
      expect(cell.isDead()).toBeTrue()
    })

    it('middle', function() {
      const cell = board.at(1, 1)

      expect(cell.location.x).toBe(1)
      expect(cell.location.y).toBe(1)
      expect(cell.isAlive()).toBeTrue()
    })

    it('bottom left', function() {
      const cell = board.at(0, 2)

      expect(cell.location.x).toBe(0)
      expect(cell.location.y).toBe(2)
      expect(cell.isAlive()).toBeTrue()
    })
  })
})

