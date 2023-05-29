const MaxPlayerInSingleGame = 8;
const getLastGame = (games) => {
  console.log(games);
  const lastGame = games[games.length - 1];
  return { ...lastGame };
};
module.exports = {
  getLastGame,
  MaxPlayerInSingleGame,
};
