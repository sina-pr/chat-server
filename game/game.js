// class MafiaGame {

const { getLastGame, MaxPlayerInSingleGame } = require('./utils');

// }

const defaultGameSetting = {
  id: 0,
  status: {
    all: [
      {
        name: 'DAY',
        time: '5min',
      },
      {
        name: 'NIGHT',
        time: '5min',
      },
      {
        name: 'POLL',
        time: '5min',
      },
    ],
    current: {
      name: 'DAY',
      time: '5min',
    },
  },
  players: [
    // {
    //   username: 'ultr4ping', // unique
    //   id: '0_user', // unique tag
    //   voted: 0, // number
    //   isMafia: true, // true or false
    // },
  ],
  createdTime: Date.now(),
};
const singleGame = { ...defaultGameSetting };

let games = [singleGame];

console.log(games);

const joinNewUser = (userData) => {
  let game = getLastGame(games);
  if (game.players.length < MaxPlayerInSingleGame) {
    game.players.push(userData);
  } else {
    games.push(defaultGameSetting);
  }
  console.log('GAMES', games, 'DEFAULT GAME SETTING', defaultGameSetting);
};

const createNewRoom = (userData) => {
  games.push(defaultGameSetting);
  joinNewUser(userData);
};

module.exports = joinNewUser;
