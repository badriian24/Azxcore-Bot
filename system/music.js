const ytdl = require('ytdl-core');
const { MessageEmbed } = require("discord.js")
const { QUEUE_LIMIT } = require("../configs/config.json")
const client = require("../index")
module.exports = {
  async play(song, message) {
    const queue = message.client.queue.get(message.guild.id);
    let embed = new MessageEmbed()
      .setColor(client.embedcolor);

    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      return queue.textChannel
        .send(`music queue is ended now`)
        .catch(console.error);
    }

    try {
      var stream = await ytdl(song.url, {
        highWaterMark: 1 << 25
      });
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      if (error.message.includes === "copyright") {
        return message.channel.send("This Video Contain Copyright content");
      } else {
        console.error(error);
      }
    }

    const dispatcher = queue.connection
      .play(stream)
      .on("finish", () => {
        if (queue.loop) {
          let lastsong = queue.songs.shift();
          queue.songs.push(lastsong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", console.error);

    dispatcher.setVolumeLogarithmic(queue.volume / 100); //VOLUME
    embed.setAuthor("Started Playing Song", message.client.user.displayAvatarURL())
      .setDescription(`**[${song.title}](${song.url})**\n${song.description}`)
      .setImage(song.thumbnail)
      .setThumbnail(song.avatar)
      .setFooter(`${song.author} | ${song.duration}m | ${song.date}`)

    queue.textChannel
      .send(embed)
      .catch(err => message.channel.send("unable To Play song"));
  }
};