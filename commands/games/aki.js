
const akinator = require('discord.js-akinator')

module.exports = {
  name: 'akinator',
  description: 'GuessWho You Are',
  aliases: ["aki"],
  
  
  execute: async (client, message, args) => {
    akinator(message, client, "id");
    message.channel.send(akinator)
    
  }
}
