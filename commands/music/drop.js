const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "drop",
  description: "Drop The Song From Queue",
  execute(client, message, args) {
    let embed = new MessageEmbed().setColor(COLOR);
    const { channel } = message.member.voice;
    if (!channel) {
      return message.channel.send(`You are not in voice cahnnel`);
    }

    const serverQueue = client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send(`The Queue is empty`);
    }
    
     if(isNaN(args[0])) {
      return message.channel.send(`Please Use Numerical Values Only`)
    }
   
    if(parseInt(args[0]) > serverQueue.songs.length) {
      return message.channel.send(`Unable to find this song`)
    }
    
    serverQueue.songs.splice(parseInt(args[0]) - 1, 1)
    embed.setDescription("DROPED THE SONG FROM QUEUE")
    embed.setThumbnail(client.user.displayAvatarURL())
    return message.channel.send(embed)
  }
};