const should = require('should')

const {
  dbSetup,
  dbTearDown,
} = require('../../../server/testUtils')
const db = require('../../../server/db')
const fixtures = require('../../../testfixtures/fixture_1')

const { app:gameserver } = require('../../../gameservers')
const app = require('../../../server').init({
  gameServer: gameserver
})

const randomPlayer = require('./index').init(app)

describe('random player',()=>{
  it('should play randomly',()=>{
    randomPlayer.start()
  })
})
