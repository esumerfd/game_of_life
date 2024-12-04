import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board } from './board';

describe('Board', function() {
  describe('initializes', function() {
    it('state empty', function() {
      const board = Board.init()

      expect(board).toBeTruthy()
      expect(board.hasLife()).toBe(false)
    })

    fit('state with life', function() {
      const board = Board.init()

      board.addLife()

      expect(board).toBeTruthy()
      expect(board.hasLife()).toBe(true)
    })
  })
})

