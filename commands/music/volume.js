const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "volume",
  description: "Manage the volume of the song",
  execute(client, message, args) {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You are not allowed to change the volume of the music")
    }
    

    
    let embed = new MessageEmbed().setColor(client.embedcolor);

    
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      
      return message.channel.send(`You need to be in voice channel`);
    }
    
     const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send(`Bot is nit playing anything`);
    }
    
    if(!args[0]) {
      return message.channel.send(`The Current Volume is ${serverQueue.volume}`)
    }
    
    if(isNaN(args[0])) {
      return message.channel.send(`Please Use Numerical Values Only`)
    }
    
    if(args[0] > 200) {
      return message.channel.send(`**the limit volume is 200**`)
    }
    
    serverQueue.volume = args[0]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
    embed.setDescription(`Seted Volume to ${args[0]}`)
    embed.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed)
    
  }
};