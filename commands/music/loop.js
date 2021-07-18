const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "loop",
  description: "Loop Your Queue and have fun",
  execute (client, message, args) {
    let embed = new MessageEmbed()
.setColor(client.embedcolor);

    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send(`you need to be in voice channel`);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send(`There is nothing playing that i could loop`);
    }
    
    //OOOOF
    serverQueue.loop = !serverQueue.loop
    
    
    embed.setDescription(`Loop is now **${serverQueue.loop ? "Enabled" : "Disabled"}**`)
    embed.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed)
    
    
    
    
  }
}