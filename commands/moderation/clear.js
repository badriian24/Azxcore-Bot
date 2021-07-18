module.exports = {
  name: "clear",
  aliases: ["purge", "clearmsgs", "clean", "clear"],
  category: "moderation",
  userPerms: ["MANAGE_MESSAGES"],
  botPerms: ["MANAGE_MESSAGES"],
  description: "Clear Your Messages!",
  usage: "Clear <Message Amount>",
  execute: async (client, message, args) => {
    //Start
		message.delete()
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send("You Don't Have Permission To Use This Ommand!")
    }
    if (!args[0])
      return message.channel.send(`${client.emotes.error} **Please Give Me Number Of Messages!**`);

    if (isNaN(args[0]))
      return message.channel.send(`${client.emotes.error} **Please Rate Me Number!**`);


    if (args[0] > 100)
      return message.channel.send(
        `${client.emotes.error} **I do not clear ${args[0]} Messages Because the Limit on Discord Tos is 100!**`
      );


    message.channel.bulkDelete(args[0]).then(Message => {
      return message.channel.send(`${client.emotes.yes} **Cleared ${Message.size} messages!**`).then(Message =>{
        setTimeout(function(){
            Message.delete()
            .catch()
        }, 5000)
    }
    )
    })
}
}