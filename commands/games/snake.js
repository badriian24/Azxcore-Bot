module.exports = {
	name: "snake",
	aliases: ["snek", "uler"],
	execute: async(client, message, args) => {
const { Snake } = require('weky');
new Snake({
    message: message,
    embed: {
    title: 'Snake', //embed title
    color: client.embedcolor, //embed color
    gameOverTitle: "Game Over", //game over embed title
    },
    emojis: {
      empty: '⬛', //zone emoji
      snakeBody: '🗿', //snake
      food: '⚰️', //food emoji
      //control
      up: '⬆️', 
      right: '⬅️',
      down: '⬇️',
      left: '➡️',
      },
    }).start()
	}
}