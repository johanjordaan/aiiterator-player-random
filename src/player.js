const _ = require('lodash')

const {
  Clients
} = require('aiiterator-core')

const init = (app) => {
  const serverClient = Clients.serverClient.init(app)

  const poll = async (previousGames,pollFreq,token) => {
    const games = await serverClient.listActiveGames(token)

    _.each(games,async (game)=>{
      const gameState = await serverClient.getGameState(game.gameId,game.currentGameStateId,token)
      const action = Actions.ActionTools.SelectRandomActionRandomOption(gameState.actions,['concede'])
      let newGameState = null
      if(joeAction !== null) {
        newGameState = await serverClient.submitAction(game.gameId,game.currentGameStateId,action,token)
      }
    })

    setTimeout(()=>{
      poll(games, pollFreq,token)
    },pollFreq)
  }

  const start = async (email,password,playerName,poolName, pollFreq) => {
    const token = await serverClient.loginAndBecome(email,password,playerName)
    const pool = await serverClient.joinPool(poolName,token)

    poll([],pollFreq,token)
  }

  return {
    start
  }
}

if (require.main === module) {
  const email = 'jdoe@gmail.com'
  const password = 'password'
  const playerName = 'joePlayer'
  const poolName = 'pool'
  const pollFreq = 1000
  init().start(email,password,playerName,poolName,pollFreq)
} else {
  module.exports = { init }
}
