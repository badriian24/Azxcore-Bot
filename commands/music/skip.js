const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "skip",
  description: "Skip the song or shift yourself to next song",
  async execute(client, message, args) {
    let embed = new MessageEmbed()
      .setColor(client.embedcolor);

    const { channel } = message.member.voice;


    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send(`You need to be in voice channel`);
    }
    const serverQueue = message.client.queue.get(message.guild.id);
    const vote = message.client.vote.get(message.guild.id)
    if (!serverQueue) {
      return message.channel.send(`There is nothing playing that i could skip`);
    }

    const vcvote = Math.floor(message.guild.me.voice.channel.members.size / 2)
    const okie = Math.floor(message.guild.me.voice.channel.members.size / 2 - 1)
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      if (vote.vote > okie) {
        serverQueue.connection.dispatcher.end();
        embed.setDescription("VOTE - SKIP | Skipping The Song")
        return message.channel.send(embed);
      }

      if (vote.voters.includes(message.author.id)) {
        return message.channel.send("You already voted for this song")
      }

      if (vcvote === 2) {
        serverQueue.connection.dispatcher.end();
        embed.setDescription(`${client.emotes.yes} | Skipping The Song`)
        return message.channel.send(embed);
      }



      vote.vote++
      vote.voters.push(message.author.id)
      return message.channel.send(`You Voted for the Song to Skip, btw we currently need ${Math.floor(vcvote - vote.vote)} votes`)




    }

    serverQueue.connection.dispatcher.end();
    embed.setDescription(`${client.emotes.yes} | Skipping The Song`)
    message.channel.send(embed);
  }
};