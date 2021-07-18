const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  description: "Get all the song name which are in queue",
  execute: (client, message, args) => {
    let embed = new MessageEmbed().setColor(client.embedcolor);
    const { channel } = message.member.voice;

    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send(`you need to be in voice channel`);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send(`There is nothing in the queue`);
    }

    embed.setDescription(
      `${serverQueue.songs
        .map((song, index) => index + 1 + ". " + song.title)
        .join("\n\n")}`,
      { split: true }
    );
    embed.setThumbnail(client.user.displayAvatarURL())
    
    message.channel.send(embed);
  }
};