import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board } from './board';
import { Rules } from './rule';

describe("Board rules", function() {

  let boardEmpty: Board
  let boardLife: Board

  beforeEach(function() {
    boardEmpty = Board.fromTemplate(
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

    boardLife = Board.fromTemplate(
      `__________
       __________
       __________
       __________
       __________
       ____x_____
       __________
       __________
       __________
       __________`)
  })

  describe('Rules', function() {
    describe('initializes', function() {
      it('has default rles', function() {
        const rules = Rules.init()

        expect(rules).toBeTruthy()
      })
    })

    describe('applied', function() {
      it('should do nothing', function() {
        const rules = Rules.init()

        const changes = rules.check(boardEmpty)

        expect(changes).toBeTruthy()
      })
    })
  })

  describe("die", function() {
    it("because no life", function() {
      const changes = Rules.init().check(boardEmpty)

      expect(changes).toHaveSize(0)
      expect(boardEmpty.hasLife()).toBeFalsy()
    })

    it("should change to die", function() {
      const changes = Rules.init().check(boardLife)

      expect(changes).toHaveSize(1)

      changes[0]()

      expect(boardLife.hasLife()).toBeFalsy()
    })
  })
})
