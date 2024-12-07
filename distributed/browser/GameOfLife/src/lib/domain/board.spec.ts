import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board } from './board';

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

    fit('encode board', function() {
      expect(Board.init().encode()).toEqual(Board.template(
        `__________
         __________
         __________
         __________
         __________
         __________
         __________
         __________
         __________
         __________`))
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
})

