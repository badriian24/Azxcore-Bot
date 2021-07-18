const Discord = require('discord.js');



module.exports = async (client, message) => {




const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`Hello **${message.author.username}** my prefix in this server is \`${client.config.prefix}\``);
  }


if (!message.content.toLowerCase().startsWith(client.config.prefix) || message.author.bot) {
    return;
  }
  
  const args = message.content
		.slice(client.config.prefix.length)
		.trim()
		.split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			cmd => cmd.aliases && cmd.aliases.includes(commandName)
		);
		
	try {
		command.execute(client, message, args);
	} catch (error) {
		message.reply(`an error occurred while executing this command\n\n\`\`\`js\n${error}\`\`\``);
	 }
}