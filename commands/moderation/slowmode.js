const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
    name: "slowmode",
    aliases: ['sm'],
    userPerms: ["MANAGE_CHANNELS"],
    clientPerms: ["MANAGE_CHANNELS"],
    category: "mod",
    cooldown: 5,
    description: "Set the slowmode for the channel!",
    execute: async (bot, message, args) => {
			if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You dont have permission to use this ommand')
  let channel = message.mentions.channels.first(),
      time = args.slice(1).join(" ");
  
  if (!channel) time = args.join(" "), channel = message.channel;
 
  
  if (args[0] === "off" || args[0] === "0s") {
    channel.setRateLimitPerUser(0);
    return message.channel.send(`${client.emotes.yes} **<#${channel.id}> slowmode has been nonaktif.**`)
  }
  if (!time) return message.channel.send(`${client.emotes.error} **Please Enter Time Format For Slowmode\n 1s = 1 detik\n 1m = 1 menit\n 1h = 1 jam**`)
  
  let convert = ms(time); // This will results the milliseconds.
  let toSecond = Math.floor(convert / 1000);
  
  if (!toSecond || toSecond == undefined) return message.channel.send("**Please Enter Correct Format Time!**")
  
  if (toSecond > 21600) return message.channel.send("**The timer must be less than or equal to 6 hours.**")
  else if (toSecond < 1) return message.channel.send("**The timer must be greater than or equal to 1 second.**")
  
  await channel.setRateLimitPerUser(toSecond);
    const embed = new MessageEmbed()
    .setTimestamp()
    .setColor(client.embedcolor)
    .setFooter(`Slowmode has been set to 1 message ${ms(ms(time), {long: true})}.`)
    .setTitle(`${message.author.tag} have set slowmode to this channel.`)
    .addFields(
        { name: "Moderator", value: `${message.author.tag}`, inline: true },
        { name: "⏰ Slowmode", value: `${ms(ms(time), {long: true})}.`, inline: true },
      );
    channel.send(embed);
}
}