const Discord = require("discord.js");

module.exports = {
	name: "help",
	aliases: ["h"],
	execute: async(client, message, args) => {
		const embed = new Discord.MessageEmbed()
		.setThumbnail(message.guild.iconURL())
		.setAuthor(client.user.displayAvatarURL({ dynamic: true }))
		.setAuthor("Command List")
		.setColor(client.embedcolor)
    .setDescription(`ProjectRed Present: [saweria](https://saweria.co/ProjectRed)\nbdrxzzzz present: [trakteer](https://trakteer.id/badriian24)`)
    .addField(`${client.emotes.info} Info`, '`help`, `imdb`, `twitter`')
    .addField(`${client.emotes.moderation} Moderation`, '`addemoji`, `addroles`, `ban`, `kick`, `slowmode`, `mute`, `unmute`, `nuke`')
    .addField(`${client.emotes.music} Music`, '`play`, `skip`, `stop`, `queue`, `loop`, `drop`, `volume`')
    .addField(`${client.emotes.games} Games`, '`8ball`, `fight`, `snake`, `aki`, `pokemon`, `trivia`')
    .addField(`${client.emotes.giveaway} Giveaway`, 'comingsoon')
    .setFooter(client.footer)
    message.channel.send(embed)
	}
}