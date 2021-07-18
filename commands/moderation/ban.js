const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>",
  execute: async (client, message, args) => {
    try {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
          "**You Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**"
        );
      if (!message.guild.me.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
          "**I Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**"
        );
      if (!args[0])
        return message.channel.send("**Please Provide A User To Ban!**");

      let banMember =
        message.mentions.members.first() ||
        client.users.cache.get(args[0]) ||
        client.users.cache.find(
          (r) => r.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        client.users.cache.find(
          (r) => r.tag.toLowerCase() === args[0].toLowerCase()
        );
      if (banMember === message.member)
        return message.channel.send("**You dont not ban your self**");

      var reason = args.slice(1).join(" ");
      const check = client.emojis.cache.find(
        (emoji) => emoji.name === client.emotes.yes
      );
      const cross = client.emojis.cache.find(
        (emoji) => emoji.name === client.emotes.error
      );
      if (!banMember.bannable)
        return message.channel.send(`${client.emotes.error} **do not ban this user!**`);
      try {
        if (banMember.user.bot) {
          message.guild.members.ban(banMember, { days: 7, reason: reason });
        } else {
          banMember
            .send(
              `**Hello, You have ban from ${message.guild.name} for - ${
                reason || "No Reason"
              }**`
            )
            .then(() =>
              message.guild.members.ban(banMember, { days: 7, reason: reason })
            )
            .catch(() => null);
        }
      } catch {
        message.guild.members.ban(banMember, { days: 7, reason: reason });
      }
      if (reason) {
        var sembed = new MessageEmbed()
          .setColor(client.embedcolor)
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setDescription(
            `${client.emotes.yes}**${banMember.user.username}** has been Banned for ${reason}`
          );
        message.channel.send(sembed);
      } else {
        var sembed2 = new MessageEmbed()
          .setColor(client.embedcolor)
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setDescription(
            `${client.emotes.yes}**${banMember.user.username}** has been Banned`
          );
        message.channel.send(sembed2);
      }
    } catch (e) {
      return message.channel.send(`${client.emotes.error}**${e.message}**`);
    }
  },
};