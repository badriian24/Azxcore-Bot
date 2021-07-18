const { MessageEmbed } = require("discord.js")
const moment = require('moment')

module.exports = {
name: "kick",
category: "moderation",
cooldown: 5,
userPerms: ["KICK_MEMBERS"],
clientPerms: ["KICK_MEMBERS"],
execute: async(client, message, args) => {  
const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
const reason = args.slice(1).join(" ")

try {
      if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.channel.send(
          "**You Dont Have The Permissions To Ban Users! - [KICK_MEMBERS]**"
        );
      if (!message.guild.me.hasPermission("KICK_MEMBERS"))
        return message.channel.send(
          "**I Dont Have The Permissions To Ban Users! - [KICK_MEMBERS]**"
        );
          if (!args[0]) return message.channel.send("**Please Mention someone you want to kick.**")
        if (!mentionedMember) return message.channel.send("**Cannot Kick User.**")
        if (mentionedMember.id === message.author.id) return message.channel.send(`${client.emotes.error} You Can't Get Yourself Out.`)
        if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
            return message.channel.send("**You can't kick this member because your role is under the user role.**")
        }
        if (mentionedMember.kickable) {
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
            .setThumbnail(mentionedMember.user.displayAvatarURL({dynamic: true}))
            .setColor(client.embedcolor)
            .setDescription(`
**Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
**Reason:** ${reason || "None"}
            `)
        message.channel.send(embed)
        mentionedMember.kick()
        } else {
            return message.channel.send(`${client.emotes.error} **I can\'t kick this user make sure that the users role is lower than my role.**`)
        }
        return undefined

				} catch (e) {
      return message.channel.send(`${client.emotes.error}**${e.message}**`);
    }
    }
		
}